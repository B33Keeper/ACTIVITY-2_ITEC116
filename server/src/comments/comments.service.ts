import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentsRepo: Repository<CommentEntity>,
  ) {}

  async list(postId?: number, offset = 0, limit = 50) {
    const where = postId ? { postId } : {};
    const [items, total] = await this.commentsRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
    });
    return { items, total, offset, limit };
  }

  async findOne(id: number) {
    const comment = await this.commentsRepo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async create(content: string, postId: number, authorUsername?: string | null) {
    const comment = this.commentsRepo.create({
      content,
      postId,
      authorUsername: authorUsername ?? null,
    });
    return this.commentsRepo.save(comment);
  }

  async update(id: number, content: string, authorUsername?: string) {
    const comment = await this.findOne(id);
    // Simple authorization: only author can update
    if (authorUsername && comment.authorUsername && comment.authorUsername !== authorUsername) {
      throw new NotFoundException('Comment not found or access denied');
    }
    comment.content = content;
    return this.commentsRepo.save(comment);
  }

  async remove(id: number, authorUsername?: string) {
    const comment = await this.findOne(id);
    // Simple authorization: only author can delete
    if (authorUsername && comment.authorUsername && comment.authorUsername !== authorUsername) {
      throw new NotFoundException('Comment not found or access denied');
    }
    await this.commentsRepo.remove(comment);
    return { message: 'Comment deleted' };
  }
}

