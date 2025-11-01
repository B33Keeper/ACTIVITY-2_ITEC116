"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
let CommentsService = class CommentsService {
    commentsRepo;
    constructor(commentsRepo) {
        this.commentsRepo = commentsRepo;
    }
    async list(postId, offset = 0, limit = 50) {
        const where = postId ? { postId } : {};
        const [items, total] = await this.commentsRepo.findAndCount({
            where,
            order: { createdAt: 'DESC' },
            skip: offset,
            take: limit,
        });
        return { items, total, offset, limit };
    }
    async findOne(id) {
        const comment = await this.commentsRepo.findOne({ where: { id } });
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        return comment;
    }
    async create(content, postId, authorUsername) {
        const comment = this.commentsRepo.create({
            content,
            postId,
            authorUsername: authorUsername ?? null,
        });
        return this.commentsRepo.save(comment);
    }
    async update(id, content, authorUsername) {
        const comment = await this.findOne(id);
        if (authorUsername && comment.authorUsername && comment.authorUsername !== authorUsername) {
            throw new common_1.NotFoundException('Comment not found or access denied');
        }
        comment.content = content;
        return this.commentsRepo.save(comment);
    }
    async remove(id, authorUsername) {
        const comment = await this.findOne(id);
        if (authorUsername && comment.authorUsername && comment.authorUsername !== authorUsername) {
            throw new common_1.NotFoundException('Comment not found or access denied');
        }
        await this.commentsRepo.remove(comment);
        return { message: 'Comment deleted' };
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map