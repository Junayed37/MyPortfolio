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
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
import { ProjectsService } from './projects.service.js';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all portfolio projects (Public)' })
  @ApiQuery({ name: 'featured', required: false, type: Boolean })
  findAll(@Query('featured') featured?: string) {
    const featuredOnly = featured === 'true';
    return this.projectsService.findAll(featuredOnly);
  }

  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get project by ID or Slug (Public)' })
  findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.projectsService.findOne(idOrSlug);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new project (Admin only)' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing project (Admin only)' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project (Admin only)' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
