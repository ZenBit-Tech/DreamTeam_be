import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendLoginLinkDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'dreamteam@gmail.com',
  })
  email: string;
}
