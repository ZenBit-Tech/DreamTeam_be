import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationUserDto {
  @ApiProperty({ example: 1, description: 'Page number', required: false })
  @IsOptional()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Number of items per page',
    required: false,
  })
  @IsOptional()
  @IsPositive()
  limit?: number = 10;
}
