import { UsersService } from './users.service';
declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
}
declare class UpdateUserDto {
    username?: string;
    email?: string;
    password?: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    list(offset?: number, limit?: number): Promise<{
        items: import("./user.entity").UserEntity[];
        total: number;
        offset: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./user.entity").UserEntity>;
    create(dto: CreateUserDto): {
        message: string;
    };
    update(id: string, dto: UpdateUserDto): Promise<import("./user.entity").UserEntity>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
export {};
