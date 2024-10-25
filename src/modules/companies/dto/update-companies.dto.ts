import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompaniesDto {
  @ApiProperty({ example: 'Company B' })
  readonly organization_name?: string;

  @ApiProperty({ example: 'updated@companyb.com' })
  readonly email?: string;

  @ApiProperty({ example: 'Client B' })
  readonly client_name?: string;
}
