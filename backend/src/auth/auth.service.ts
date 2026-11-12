import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existing = await this.prisma.admin.findUnique({
      where: { email: registerDto.email },
    });

    if (existing) {
      throw new ConflictException('Admin already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const admin = await this.prisma.admin.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return {
      message: 'Admin registered successfully',
      admin,
    };
  }

  async login(loginDto: LoginDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { email: loginDto.email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(loginDto.password, admin.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin.id, email: admin.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    };
  }
}
