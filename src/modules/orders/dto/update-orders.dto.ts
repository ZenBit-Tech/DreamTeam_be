import { ApiProperty } from '@nestjs/swagger';

import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatus } from 'src/common/enums';

export class UpdateOrderDto {
  @ApiProperty({ example: '2024-11-01T10:00:00Z' })
  @IsOptional()
  @IsDate()
  readonly collection_date?: Date;

  @ApiProperty({ example: '123 Main St, Springfield' })
  @IsOptional()
  @IsString()
  readonly collection_address?: string;

  @ApiProperty({ example: OrderStatus.COMPLETED, enum: OrderStatus })
  @IsOptional()
  @IsEnum(OrderStatus)
  readonly status?: OrderStatus;

  @ApiProperty({ example: 'Leave at front desk' })
  @IsOptional()
  @IsString()
  readonly note?: string;

  @ApiProperty({ example: 'Delayed delivery' })
  @IsOptional()
  @IsString()
  readonly failed_reason?: string;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  readonly routeId?: number;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  readonly customerId?: number;

  @ApiProperty({ example: [1, 2, 3] })
  @IsOptional()
  readonly luggageIds?: number[];
}
