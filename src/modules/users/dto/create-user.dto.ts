import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/common/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'johndoe@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '+123456789' })
  phone_number: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty({ example: UserRole.ADMIN, enum: UserRole })
  role: UserRole;
}
