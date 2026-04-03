import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
    findOne(id: string): any;
    update(id: string, dto: UpdateUserDto): Promise<{
        email: string;
        id: number;
        role: string;
        status: string;
    }>;
    remove(id: string): Promise<{
        email: string;
        password: string;
        id: number;
        role: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
