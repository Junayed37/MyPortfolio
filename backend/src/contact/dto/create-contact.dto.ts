import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ example: 'Project Inquiry' })
  @IsOptional()
  @IsString()
  subject?: string;

  @ApiProperty({ example: 'Hi! I would like to discuss a new full-stack project...' })
  @IsNotEmpty()
  @IsString()
  message!: string;
}
