import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateUserDto): Promise<{
        email: string;
        id: number;
        role: string;
        status: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        id: number;
        role: string;
        status: string;
        createdAt: Date;
    }[]>;
    update(id: number, dto: UpdateUserDto): Promise<{
        email: string;
        id: number;
        role: string;
        status: string;
    }>;
    remove(id: number): Promise<{
        email: string;
        password: string;
        id: number;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
