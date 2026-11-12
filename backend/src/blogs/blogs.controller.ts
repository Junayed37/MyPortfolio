import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { BlogsService } from './blogs.service.js';
import { CreateBlogDto } from './dto/create-blog.dto.js';
import { UpdateBlogDto } from './dto/update-blog.dto.js';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all published blogs (Public)' })
  @ApiQuery({ name: 'all', required: false, type: Boolean, description: 'Include unpublished blogs (Admin)' })
  findAll(@Query('all') all?: string) {
    const onlyPublished = all !== 'true';
    return this.blogsService.findAll(onlyPublished);
  }

  @Get(':slugOrId')
  @ApiOperation({ summary: 'Get blog post by Slug or ID (Public)' })
  findOne(@Param('slugOrId') slugOrId: string) {
    return this.blogsService.findOne(slugOrId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new blog post (Admin only)' })
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update a blog post (Admin only)' })
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a blog post (Admin only)' })
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
