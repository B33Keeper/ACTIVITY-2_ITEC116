import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';

class CreateCommentDto {
  content!: string;
  postId!: number;
  authorUsername?: string;
}

class UpdateCommentDto {
  content!: string;
  authorUsername?: string;
}

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  @ApiQuery({ name: 'postId', required: false, schema: { type: 'number' } })
  @ApiQuery({ name: 'offset', required: false, schema: { default: 0, type: 'number' } })
  @ApiQuery({ name: 'limit', required: false, schema: { default: 50, type: 'number' } })
  list(
    @Query('postId') postId?: number,
    @Query('offset') offset = 0,
    @Query('limit') limit = 50,
  ) {
    return this.commentsService.list(
      postId ? Number(postId) : undefined,
      Number(offset),
      Number(limit),
    );
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(Number(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req: any, @Body() dto: CreateCommentDto) {
    // Get username from JWT token (req.user) or fallback to body
    const username = req.user?.username || dto.authorUsername || null;
    return this.commentsService.create(dto.content, dto.postId, username);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  @UseGuards(AuthGuard('jwt'))
  update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateCommentDto) {
    // Get username from JWT token (req.user) or fallback to body
    const username = req.user?.username || dto.authorUsername || null;
    return this.commentsService.update(Number(id), dto.content, username);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  @UseGuards(AuthGuard('jwt'))
  remove(@Request() req: any, @Param('id') id: string, @Body() body?: { authorUsername?: string }) {
    // Get username from JWT token (req.user) or fallback to body
    const username = req.user?.username || body?.authorUsername || null;
    return this.commentsService.remove(Number(id), username);
  }
}

