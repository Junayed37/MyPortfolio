import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { BlogsModule } from './blogs/blogs.module.js';
import { ContactModule } from './contact/contact.module.js';

@Module({
  imports: [PrismaModule, AuthModule, ProjectsModule, BlogsModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
