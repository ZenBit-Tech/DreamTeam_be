import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsString, IsDate, IsNumber } from 'class-validator';
import {LuggageSize, OrderStatus} from "src/common/enums";

export class CreateOrderDto {
    @ApiProperty({ example: '2024-11-01T10:00:00Z' })
    @IsNotEmpty()
    @IsDate()
    readonly collection_date: Date;

    @ApiProperty({ example: '123 Main St, Springfield' })
    @IsNotEmpty()
    @IsString()
    readonly collection_address: string;

    @ApiProperty({ example: OrderStatus.UPCOMING, enum: OrderStatus })
    @IsNotEmpty()
    @IsEnum(OrderStatus)
    readonly status: OrderStatus;

    @ApiProperty({ example: 'Handle with care' })
    @IsOptional()
    @IsString()
    readonly note?: string;

    @ApiProperty({ example: 'Customer unavailable' })
    @IsOptional()
    @IsString()
    readonly failed_reason?: string;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    readonly routeId: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @IsNumber()
    readonly customerId: number;

    @IsNotEmpty()
    @IsEnum(LuggageSize)
    luggageSize: LuggageSize;

    @IsNumber()
    luggageWeight: number;
}
