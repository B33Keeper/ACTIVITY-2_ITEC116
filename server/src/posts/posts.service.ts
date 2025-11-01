import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepo: Repository<PostEntity>,
  ) {}

  async list(offset = 0, limit = 10) {
    const [items, total] = await this.postsRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
    });
    return { items, total, offset, limit };
  }

  async findOne(id: number) {
    const post = await this.postsRepo.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async create(
    title: string,
    content: string,
    authorUsername?: string | null,
    imageUrl?: string | null,
  ) {
    const post = this.postsRepo.create({
      title,
      content,
      authorUsername: authorUsername ?? null,
      imageUrl: imageUrl ?? null,
    });
    return this.postsRepo.save(post);
  }

  async update(
    id: number,
    title: string,
    content: string,
    authorUsername?: string,
    imageUrl?: string | null,
  ) {
    const post = await this.findOne(id);
    // Simple authorization: only author can update
    if (authorUsername && post.authorUsername && post.authorUsername !== authorUsername) {
      throw new NotFoundException('Post not found or access denied');
    }
    post.title = title;
    post.content = content;
    if (imageUrl !== undefined) {
      post.imageUrl = imageUrl;
    }
    return this.postsRepo.save(post);
  }

  async remove(id: number, authorUsername?: string) {
    const post = await this.findOne(id);
    // Simple authorization: only author can delete
    if (authorUsername && post.authorUsername && post.authorUsername !== authorUsername) {
      throw new NotFoundException('Post not found or access denied');
    }
    await this.postsRepo.remove(post);
    return { message: 'Post deleted' };
  }
}


