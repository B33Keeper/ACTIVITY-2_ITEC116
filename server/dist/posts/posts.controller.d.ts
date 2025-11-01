import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    list(offset?: number, limit?: number): Promise<{
        items: import("./post.entity").PostEntity[];
        total: number;
        offset: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./post.entity").PostEntity>;
    create(req: any, title: string, content: string, authorUsername?: string, file?: Express.Multer.File): Promise<import("./post.entity").PostEntity>;
    update(req: any, id: string, title: string, content: string, authorUsername?: string, existingImageUrl?: string, file?: Express.Multer.File): Promise<import("./post.entity").PostEntity>;
    remove(req: any, id: string, body?: {
        authorUsername?: string;
    }): Promise<{
        message: string;
    }>;
}
