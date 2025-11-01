import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
export declare class CommentsService {
    private readonly commentsRepo;
    constructor(commentsRepo: Repository<CommentEntity>);
    list(postId?: number, offset?: number, limit?: number): Promise<{
        items: CommentEntity[];
        total: number;
        offset: number;
        limit: number;
    }>;
    findOne(id: number): Promise<CommentEntity>;
    create(content: string, postId: number, authorUsername?: string | null): Promise<CommentEntity>;
    update(id: number, content: string, authorUsername?: string): Promise<CommentEntity>;
    remove(id: number, authorUsername?: string): Promise<{
        message: string;
    }>;
}
