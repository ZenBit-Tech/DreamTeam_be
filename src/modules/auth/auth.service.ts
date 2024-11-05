import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EmailService } from 'src/common/email/email.service';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sendLoginEmail(email: string): Promise<void> {
    try {
      const user = await this.usersService.findOne({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const token = this.jwtService.sign({ userId: user.id, role: user.role });

      await this.usersService.updateUser(user.id, { token });

      const frontendUrl = this.configService.get<string>('CLIENT_URL');
      const loginUrl = `${frontendUrl}/auth/login?token=${token}`;
      const subject = 'Login Link';
      const htmlForEmail = `<p>Click <a href="${loginUrl}">here</a> to log in.</p>`;

      await this.emailService.sendMail(email, subject, htmlForEmail);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new UnauthorizedException('Failed to send login link');
    }
  }

  async login(token: string): Promise<{ token: string }> {
    try {
      const payload = this.jwtService.verify(token);
      let user = await this.usersService.findOne({
        where: { id: payload.userId },
      });

      if (!user || user.token !== token) {
        throw new UnauthorizedException('Invalid token');
      } else {
        user = await this.usersService.updateUser(user.id, { token: null });
      }

      return { token };
    } catch (error) {
      throw new UnauthorizedException((error as Error).message);
    }
  }
}
