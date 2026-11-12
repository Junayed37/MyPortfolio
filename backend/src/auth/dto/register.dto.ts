import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'admin@portfolio.dev' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'admin123456' })
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
