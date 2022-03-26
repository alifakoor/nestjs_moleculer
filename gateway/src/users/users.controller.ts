import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './interfaces/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    const duplicatedUser: User = await this.usersService.findByUsername(
      body.username,
    );
    if (duplicatedUser) throw new ConflictException('User already exist.');

    return await this.usersService.create(body);
  }

  @Get()
  async findAll(): Promise<Array<User>> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user: User = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<User> {
    const user: User = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found.');

    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    const user: User = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('User not found.');

    return await this.usersService.remove(id);
  }
}
