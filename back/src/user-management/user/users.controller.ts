import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Public } from '../../authentication/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './users.entity';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Get()
  async findAll(): Promise<Users[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Users> {
    return await this.userService.findOne(id);
  }

  @Post()
  @Public()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<Users> {
    return await this.userService.deleteUser(id);
  }

  @Put(':id/verify')
  async verifyUser(@Param('id') id: string): Promise<Users> {
    return await this.userService.verifyUser(id);
  }
}
