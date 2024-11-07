import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCompaniesDto {
  @ApiProperty({ example: 'Company B' })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  readonly organization_name?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 100)
  @ApiProperty({ example: 'updated@companyb.com' })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  @ApiProperty({ example: 'Client B' })
  readonly client_name?: string;
}
