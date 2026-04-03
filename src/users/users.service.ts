import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already exists');
    const hashed = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: { email: dto.email, password: hashed, role: dto.role, status: dto.status },
      select: { id: true, email: true, role: true, status: true, createdAt: true },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({ select: { id: true, email: true, role: true, status: true, createdAt: true } });
  }

  async update(id: number, dto: UpdateUserDto) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.update({ where: { id }, data: dto, select: { id: true, email: true, role: true, status: true } });
  }

  async remove(id: number) {
    // Optionally soft-delete: just set status inactive
    return this.prisma.user.update({ where: { id }, data: { status: 'inactive' } });
  }
}