import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'AI Resume Builder' })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({ example: 'ai-resume-builder' })
  @IsNotEmpty()
  @IsString()
  slug!: string;

  @ApiProperty({ example: 'An automated resume generator using LLMs' })
  @IsNotEmpty()
  @IsString()
  summary!: string;

  @ApiProperty({ example: 'Full detailed case study description with architecture, benchmarks, and details...' })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({ example: ['Next.js', 'NestJS', 'PostgreSQL', 'TailwindCSS'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  techStack!: string[];

  @ApiPropertyOptional({ example: 'https://airesume.demo.app' })
  @IsOptional()
  @IsString()
  liveUrl?: string;

  @ApiPropertyOptional({ example: 'https://github.com/myname/airesume' })
  @IsOptional()
  @IsString()
  githubUrl?: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: true, default: false })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;
}
