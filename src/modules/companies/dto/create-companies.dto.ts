import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCompaniesDto {
  @ApiProperty({ example: 'Company A' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  readonly organization_name: string;

  @ApiProperty({ example: 'test@companyb.com' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'Client A' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  readonly client_name: string;
}
