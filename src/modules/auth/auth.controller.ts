import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @Post('send-login-link')
  @HttpCode(HttpStatus.OK)
  async sendLoginLink(
    @Body() sendLoginLinkDto: SendLoginLinkDto,
  ): Promise<{ message: string }> {
    this.authService.sendLoginEmail(sendLoginLinkDto.email);

    return { message: 'Login link sent to your email' };
  }

  @ApiOperation({ summary: 'Authenticate user with token' })
  @ApiOkResponse({
    description: 'User authenticated successfully',
    status: 200,
    type: LoginDto,
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async authenticate(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto.token);
  }
}
