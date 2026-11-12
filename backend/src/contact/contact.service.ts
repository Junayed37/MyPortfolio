import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateContactDto } from './dto/create-contact.dto.js';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    const contact = await this.prisma.contactMessage.create({
      data: createContactDto,
    });

    return {
      message: 'Thank you for reaching out! Your message has been received.',
      data: contact,
    };
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(id: string) {
    const exists = await this.prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Message with ID "${id}" not found`);
    }

    return this.prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException(`Message with ID "${id}" not found`);
    }

    return this.prisma.contactMessage.delete({
      where: { id },
    });
  }
}
