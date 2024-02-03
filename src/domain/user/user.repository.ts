import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { BaseRepository } from '@app/common';
import { UserEntity } from '@app/entity';
import { User, UserEntityMapper } from './domain';
import { PostUserRequestDTO } from './dto';

export abstract class UserRepositoryPort extends BaseRepository<UserEntity> {
  abstract createUser(postDto: PostUserRequestDTO): Promise<User>;
  abstract updateProperty(
    id: number,
    properties: Partial<UserEntity>,
  ): Promise<void>;
  abstract findOneByPK(id: number): Promise<User | null>;
}

export class UserRepository extends UserRepositoryPort {
  constructor(
    @InjectEntityManager()
    manager: EntityManager,
  ) {
    super(UserEntity, manager);
  }

  async createUser(postDto: PostUserRequestDTO): Promise<User> {
    const user = this.create({ ...postDto });
    await this.save(user);
    return UserEntityMapper.toDomain(user);
  }

  async updateProperty(
    id: number,
    properties: Partial<UserEntity>,
  ): Promise<void> {
    await this.update(id, { ...properties });
  }

  async findOneByPK(id: number): Promise<User | null> {
    const user = await this.findOneBy({ id });
    return !!user ? UserEntityMapper.toDomain(user) : null;
  }
}
