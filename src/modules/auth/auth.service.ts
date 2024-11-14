import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EmailService } from 'src/common/email/email.service';
import User from 'src/common/entities/user.entity';
import { TokensExpiration } from 'src/common/enums';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sendLoginEmail(email: string): Promise<{ message: string }> {
    try {
      const user = await this.usersService.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const token = this.jwtService.sign({ userId: user.id });

      await this.usersService.updateUser(user.id, { token });

      const frontendUrl = this.configService.get<string>('CLIENT_URL');
      const loginUrl = `${frontendUrl}/login?token=${token}`;
      const subject = 'Welcome to DreamTeam!';

      const htmlForEmail = `
      <p>Welcome to DreamTeam!</p>
      <p>Dear ${user.full_name},</p>
      <p>Your account has been successfully registered! We warmly welcome you to DreamTeam.</p>
      <p>Log in to DreamTeam by clicking the following <a href="${loginUrl}">link</a></p>
      
      <p>If you have any queries or require assistance during the setup process, 
         please do not hesitate to reply to this email. We are always available to assist you.</p>
      <p>Best regards,</p>
      <p>Dream Team</p>
    `;

      await this.emailService.sendMail(email, subject, htmlForEmail);

      return { message: 'Login link sent to your email' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new UnauthorizedException('Failed to send login link');
    }
  }

  async login(
    token: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    try {
      const payload = this.jwtService.verify(token);
      let user = await this.usersService.findOne({
        where: { id: payload.userId },
      });

      if (!user || user.token !== token) {
        throw new UnauthorizedException('Invalid token');
      }

      const accessToken = this.jwtService.sign(
        { userId: user.id, role: user.role },
        { expiresIn: TokensExpiration.ACCESS_TOKEN_EXP },
      );
      const refreshToken = this.jwtService.sign(
        { userId: user.id, role: user.role },
        {
          expiresIn: TokensExpiration.REFRESH_TOKEN_EXP,
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        },
      );

      user = await this.usersService.updateUser(user.id, {
        token: null,
      });

      return { accessToken, refreshToken, user };
    } catch (error) {
      throw new UnauthorizedException((error as Error).message);
    }
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; user: User }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.usersService.findOne({
        where: { id: payload.userId },
      });

      if (!user) {
        throw new UnauthorizedException('Invalid user');
      }

      const accessToken = this.jwtService.sign(
        { userId: user.id, role: user.role },
        { expiresIn: TokensExpiration.ACCESS_TOKEN_EXP },
      );

      return { accessToken, user };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
