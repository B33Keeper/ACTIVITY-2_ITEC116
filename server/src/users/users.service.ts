import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,
  ) {}

  async list(offset = 0, limit = 10) {
    const [items, total] = await this.usersRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
      select: ['id', 'username', 'email', 'createdAt'], // Exclude passwordHash
    });
    return { items, total, offset, limit };
  }

  async findOne(id: number) {
    const user = await this.usersRepo.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'createdAt'], // Exclude passwordHash
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.usersRepo.findOne({ where: { username } });
  }

  async create(username: string, email: string, passwordHash: string): Promise<UserEntity> {
    const user = this.usersRepo.create({ username, email, passwordHash });
    return this.usersRepo.save(user);
  }

  async update(
    id: number,
    username?: string,
    email?: string,
    password?: string,
  ): Promise<UserEntity> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (username !== undefined) user.username = username;
    if (email !== undefined) user.email = email;
    if (password !== undefined) {
      user.passwordHash = await bcrypt.hash(password, 10);
    }
    return this.usersRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepo.remove(user);
    return { message: 'User deleted' };
  }
}


