import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
export declare class PostsService {
    private readonly postsRepo;
    constructor(postsRepo: Repository<PostEntity>);
    list(offset?: number, limit?: number): Promise<{
        items: PostEntity[];
        total: number;
        offset: number;
        limit: number;
    }>;
    findOne(id: number): Promise<PostEntity>;
    create(title: string, content: string, authorUsername?: string | null, imageUrl?: string | null): Promise<PostEntity>;
    update(id: number, title: string, content: string, authorUsername?: string, imageUrl?: string | null): Promise<PostEntity>;
    remove(id: number, authorUsername?: string): Promise<{
        message: string;
    }>;
}
