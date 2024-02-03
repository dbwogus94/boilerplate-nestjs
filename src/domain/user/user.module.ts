import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService, UserServiceUseCase } from './user.service';
import { UserRepository, UserRepositoryPort } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: UserServiceUseCase,
      useClass: UserService,
    },
    {
      provide: UserRepositoryPort,
      useClass: UserRepository,
    },
  ],
  exports: [UserRepositoryPort],
})
export class UserModule {}
