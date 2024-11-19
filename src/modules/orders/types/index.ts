import { ApiProperty } from '@nestjs/swagger';

export default class OrderResponse {
  @ApiProperty({ example: 1, description: 'The unique ID of the order' })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the associated company',
  })
  companyId: number;

  @ApiProperty({
    example: '2024-10-25T17:26:15.099Z',
    description: 'The date when the order was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-10-26T17:26:15.099Z',
    description: 'The date when the order was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'Pending',
    description: 'The current status of the order',
  })
  status: string;

  @ApiProperty({
    example: 150.5,
    description: 'The total amount of the order',
  })
  totalAmount: number;

  @ApiProperty({
    example: 'Customer Note about the order',
    description: 'Any notes associated with the order',
  })
  customerNote: string;
}
