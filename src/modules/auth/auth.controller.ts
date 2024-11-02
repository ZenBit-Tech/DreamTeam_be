import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthenticateDto } from './dto/authenticate.dto';
import { LoginDto } from './dto/login.dto';

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
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async sendLoginLink(
    @Body() loginDto: LoginDto,
  ): Promise<{ message: string }> {
    this.authService.login(loginDto.email);

    return { message: 'Login link sent to your email' };
  }

  @ApiOperation({ summary: 'Authenticate user with token' })
  @ApiOkResponse({
    description: 'User authenticated successfully',
    status: 200,
    type: AuthenticateDto,
  })
  @Post('authenticate')
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @Body() authenticateDto: AuthenticateDto,
  ): Promise<string> {
    return this.authService.validateToken(authenticateDto.token);
  }
}
