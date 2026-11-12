import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBlogDto } from './dto/create-blog.dto.js';
import { UpdateBlogDto } from './dto/update-blog.dto.js';

@Injectable()
export class BlogsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto) {
    return this.prisma.blog.create({
      data: createBlogDto,
    });
  }

  async findAll(onlyPublished = true) {
    return this.prisma.blog.findMany({
      where: onlyPublished ? { published: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(slugOrId: string) {
    const blog = await this.prisma.blog.findFirst({
      where: {
        OR: [{ id: slugOrId }, { slug: slugOrId }],
      },
    });

    if (!blog) {
      throw new NotFoundException(`Blog post with identifier "${slugOrId}" not found`);
    }

    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    await this.findOne(id);
    return this.prisma.blog.update({
      where: { id },
      data: updateBlogDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.blog.delete({
      where: { id },
    });
  }
}
