import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthServiceUseCase } from '../auth/auth.service';
import {
  GetUserResponseDTO,
  PatchUserRequestDTO,
  PostUserRequestDTO,
  PostUserResponseDTO,
} from './dto';
import { UserRepositoryPort } from './user.repository';
import { errorMessage } from '@app/custom';
import { Util } from '@app/common';

export abstract class UserServiceUseCase {
  abstract createUser(
    postDto: PostUserRequestDTO,
  ): Promise<PostUserResponseDTO>;
  abstract getUser(userId: number): Promise<GetUserResponseDTO>;
  abstract updateUser(
    userId: number,
    postDto: PatchUserRequestDTO,
  ): Promise<void>;
  abstract softRemoveUser(userId: number): Promise<void>;
}

@Injectable()
export class UserService extends UserServiceUseCase {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly userRepo: UserRepositoryPort,
    private readonly authService: AuthServiceUseCase,
  ) {
    super();
  }

  async createUser(postDto: PostUserRequestDTO): Promise<PostUserResponseDTO> {
    const queryRunner = this.dataSource.createQueryRunner();
    const manager = queryRunner.manager;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const txUserRepo = this.userRepo.createTransactionRepo(manager);
      const newUser = await txUserRepo.createOne(postDto);

      const token = this.authService.issueToken({
        id: newUser.id,
      });
      const nickname = postDto.nickname ?? newUser.generateNickname().nickname;
      const updateUser = await txUserRepo.updateOne(newUser, {
        token,
        nickname,
      });

      await queryRunner.commitTransaction();
      return Util.toInstance(PostUserResponseDTO, updateUser.props);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getUser(userId: number): Promise<GetUserResponseDTO> {
    const user = await this.userRepo.findOneByPK(userId);
    if (!user) throw new NotFoundException(errorMessage.E404_APP_001);
    return Util.toInstance(GetUserResponseDTO, {
      ...user.props,
    });
  }

  async updateUser(
    userId: number,
    postDto: PatchUserRequestDTO,
  ): Promise<void> {
    const user = await this.userRepo.findOneByPK(userId);
    if (!user) throw new NotFoundException(errorMessage.E404_APP_001);
    await this.userRepo.updateOneBy(userId, { ...postDto });
  }

  async softRemoveUser(userId: number): Promise<void> {
    const user = await this.userRepo.findOneByPK(userId);
    if (!user) throw new NotFoundException(errorMessage.E404_APP_001);
    await this.userRepo.softDelete(userId);
  }
}
