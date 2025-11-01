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
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

class CreateUserDto {
  username!: string;
  email!: string;
  password!: string;
}

class UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'offset', required: false, schema: { default: 0, type: 'number' } })
  @ApiQuery({ name: 'limit', required: false, schema: { default: 10, type: 'number' } })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  list(@Query('offset') offset = 0, @Query('limit') limit = 10) {
    return this.usersService.list(Number(offset), Number(limit));
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() dto: CreateUserDto) {
    // Would typically use AuthService.register instead, but providing for completeness
    return { message: 'Use /auth/register to create users' };
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(Number(id), dto.username, dto.email, dto.password);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number' })
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}

