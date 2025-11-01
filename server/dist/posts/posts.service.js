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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("./post.entity");
let PostsService = class PostsService {
    postsRepo;
    constructor(postsRepo) {
        this.postsRepo = postsRepo;
    }
    async list(offset = 0, limit = 10) {
        const [items, total] = await this.postsRepo.findAndCount({
            order: { createdAt: 'DESC' },
            skip: offset,
            take: limit,
        });
        return { items, total, offset, limit };
    }
    async findOne(id) {
        const post = await this.postsRepo.findOne({ where: { id } });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async create(title, content, authorUsername, imageUrl) {
        const post = this.postsRepo.create({
            title,
            content,
            authorUsername: authorUsername ?? null,
            imageUrl: imageUrl ?? null,
        });
        return this.postsRepo.save(post);
    }
    async update(id, title, content, authorUsername, imageUrl) {
        const post = await this.findOne(id);
        if (authorUsername && post.authorUsername && post.authorUsername !== authorUsername) {
            throw new common_1.NotFoundException('Post not found or access denied');
        }
        post.title = title;
        post.content = content;
        if (imageUrl !== undefined) {
            post.imageUrl = imageUrl;
        }
        return this.postsRepo.save(post);
    }
    async remove(id, authorUsername) {
        const post = await this.findOne(id);
        if (authorUsername && post.authorUsername && post.authorUsername !== authorUsername) {
            throw new common_1.NotFoundException('Post not found or access denied');
        }
        await this.postsRepo.remove(post);
        return { message: 'Post deleted' };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.PostEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map