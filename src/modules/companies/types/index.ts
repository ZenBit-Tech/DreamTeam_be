import { ApiProperty } from '@nestjs/swagger';

export default class CompanyResponse {
  @ApiProperty({ example: 1, description: 'The unique ID of the company' })
  id: number;

  @ApiProperty({
    example: 'Company B',
    description: 'The name of the organization',
  })
  organization_name: string;

  @ApiProperty({
    example: 'test@companyb.com',
    description: 'The email address of the company',
  })
  email: string;

  @ApiProperty({
    example: 'Client B',
    description: 'The name of the client associated with the company',
  })
  client_name: string;

  @ApiProperty({
    example: '2024-10-25T17:26:15.099Z',
    description: 'The date when the company was created',
  })
  created_at: Date;

  @ApiProperty({
    example: '2024-10-25T17:26:15.099Z',
    description: 'The date when the company was last updated',
  })
  updated_at: Date;
}
