import { PickType } from '@nestjs/swagger';

import { UserEntity } from '@app/entity';

export class PostUserResponseDTO extends PickType(UserEntity, [
  'nickname',
  'token',
]) {}
