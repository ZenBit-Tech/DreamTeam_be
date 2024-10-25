import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

export class CreateCompaniesDto {
  @ApiProperty({ example: 'Company A' })
  @IsNotEmpty()
  readonly organization_name: string;

  @ApiProperty({ example: 'test@companyb.com' })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ example: 'Client A' })
  @IsNotEmpty()
  readonly client_name: string;
}
