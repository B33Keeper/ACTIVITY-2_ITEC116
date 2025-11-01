import { CommentsService } from './comments.service';
declare class CreateCommentDto {
    content: string;
    postId: number;
    authorUsername?: string;
}
declare class UpdateCommentDto {
    content: string;
    authorUsername?: string;
}
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    list(postId?: number, offset?: number, limit?: number): Promise<{
        items: import("./comment.entity").CommentEntity[];
        total: number;
        offset: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./comment.entity").CommentEntity>;
    create(req: any, dto: CreateCommentDto): Promise<import("./comment.entity").CommentEntity>;
    update(req: any, id: string, dto: UpdateCommentDto): Promise<import("./comment.entity").CommentEntity>;
    remove(req: any, id: string, body?: {
        authorUsername?: string;
    }): Promise<{
        message: string;
    }>;
}
export {};
