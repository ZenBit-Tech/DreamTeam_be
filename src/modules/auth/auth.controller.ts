import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Res,
  UnauthorizedException,
  Req,
  Get,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

import { Request, Response } from 'express';
import User from 'src/common/entities/user.entity';
import { TokensExpiration } from 'src/common/enums';
import { SkipAuth } from 'src/common/guards/skip-auth.decorator';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SendLoginLinkDto } from './dto/send-login-link.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Send login link to user email' })
  @ApiOkResponse({
    description: 'Login link sent successfully',
    status: 200,
    example: { message: 'Login link sent to your email' },
  })
  @SkipAuth()
  @Post('send-login-link')
  @HttpCode(HttpStatus.OK)
  async sendLoginLink(
    @Body() sendLoginLinkDto: SendLoginLinkDto,
  ): Promise<{ message: string }> {
    return this.authService.sendLoginEmail(sendLoginLinkDto.email);
  }

  @ApiOperation({ summary: 'Authenticate user with token' })
  @ApiOkResponse({
    description: 'User authenticated successfully',
    status: 200,
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        user: { $ref: getSchemaPath(User) },
      },
    },
  })
  @SkipAuth()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ token: string; user: User }> {
    try {
      const { accessToken, refreshToken, user } = await this.authService.login(
        loginDto.token,
      );

      const cookiesExpiration = new Date();
      const expirationDays = TokensExpiration.COOKIES_EXP;

      cookiesExpiration.setDate(cookiesExpiration.getDate() + expirationDays);

      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: cookiesExpiration.getTime(),
      });

      return { token: accessToken, user };
    } catch (error) {
      throw new UnauthorizedException((error as Error).message);
    }
  }

  @ApiOperation({ summary: 'Logout user and clear refresh token' })
  @ApiOkResponse({
    description: 'User logged out successfully',
    status: 200,
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'User logged out successfully' },
      },
    },
  })
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    try {
      response.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
      });

      return { message: 'User logged out successfully' };
    } catch (error) {
      throw new UnauthorizedException((error as Error).message);
    }
  }

  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiOkResponse({
    description: 'Access token refreshed successfully',
    status: 200,
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
        user: { $ref: getSchemaPath(User) },
      },
    },
  })
  @SkipAuth()
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() request: Request,
  ): Promise<{ token: string; user: User }> {
    try {
      const { refreshToken } = request.cookies;

      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token missing');
      }

      const { accessToken, user } =
        await this.authService.refreshAccessToken(refreshToken);

      return { token: accessToken, user };
    } catch (error) {
      throw new UnauthorizedException((error as Error).message);
    }
  }
}
