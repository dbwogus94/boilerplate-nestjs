import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '@app/common';
import { UserEntity } from '@app/entity';
import { User, UserEntityMapper } from './domain';
import { PostUserRequestDTO } from './dto';

export abstract class UserRepositoryPort extends BaseRepository<UserEntity> {
  abstract findOneByPK(userId: number): Promise<User | null>;
  abstract createOne(postDto: PostUserRequestDTO): Promise<User>;
  abstract updateOne(
    originUser: User,
    properties: Partial<UserEntity>,
  ): Promise<User>;
  abstract updateOneBy(
    userId: number,
    properties: Partial<UserEntity>,
  ): Promise<void>;
}

export class UserRepository extends UserRepositoryPort {
  constructor(
    @InjectEntityManager()
    manager: EntityManager,
  ) {
    super(UserEntity, manager);
  }

  async findOneByPK(userId: number): Promise<User | null> {
    const user = await this.findOneBy({ id: userId });
    return !!user ? UserEntityMapper.toDomain(user) : null;
  }

  async createOne(postDto: PostUserRequestDTO): Promise<User> {
    const user = this.create({ ...postDto });
    await this.save(user);
    return UserEntityMapper.toDomain(user);
  }

  async updateOne(user: User, properties: Partial<UserEntity>): Promise<User> {
    const updateUser = this.create({ ...user.props, ...properties });
    await this.save(updateUser);
    return UserEntityMapper.toDomain(updateUser);
  }

  async updateOneBy(
    userId: number,
    properties: Partial<UserEntity>,
  ): Promise<void> {
    await this.update(userId, { ...properties });
  }
}
