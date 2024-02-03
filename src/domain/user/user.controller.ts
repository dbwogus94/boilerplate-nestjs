import { ApiControllerDocument, GetUserInfoDecorator } from '@app/common';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentHelper } from './document/document.decorator';
import {
  GetUserResponseDTO,
  PostUserRequestDTO,
  PostUserResponseDTO,
} from './dto';
import { JwtGuard } from '../auth/guard';
import { UserServiceUseCase } from './user.service';

@ApiControllerDocument('users API')
@Controller('/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserServiceUseCase) {}

  @DocumentHelper('postUsers')
  @Post()
  @HttpCode(201)
  async postUsers(
    @Body() postDto: PostUserRequestDTO,
  ): Promise<PostUserResponseDTO> {
    return this.userService.createUser(postDto);
  }

  @DocumentHelper('getUser')
  @UseGuards(JwtGuard)
  @Get('/me')
  async getUser(
    @GetUserInfoDecorator('id') userId: number,
  ): Promise<GetUserResponseDTO> {
    return this.userService.getUser(userId);
  }

  @DocumentHelper('deleteUser')
  @UseGuards(JwtGuard)
  @Delete('/me')
  @HttpCode(204)
  async deleteUser(@GetUserInfoDecorator('id') userId: number): Promise<void> {
    await this.userService.softRemoveUser(userId);
  }
}
