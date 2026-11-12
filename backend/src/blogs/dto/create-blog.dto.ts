import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'Microservices with NestJS and RabbitMQ' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'microservices-nestjs-rabbitmq' })
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @ApiProperty({ example: 'A comprehensive guide on scalable message-driven architectures.' })
  @IsNotEmpty()
  @IsString()
  excerpt!: string;

  @ApiProperty({ example: '# Microservices Guide\n\nIn this article, we explore...' })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty({ example: ['NestJS', 'Architecture', 'Microservices'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  tags!: string[];

  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  published?: boolean;
}
