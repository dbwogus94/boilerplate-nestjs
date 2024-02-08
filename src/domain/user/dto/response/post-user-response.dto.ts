import { ApiProperty, PickType } from '@nestjs/swagger';

import { defaultResponseProperties } from '@app/common';
import { UserEntity } from '@app/entity';
import { Expose } from 'class-transformer';

export class PostUserResponseDTO extends PickType(UserEntity, [
  ...defaultResponseProperties,
  'nickname',
]) {
  @ApiProperty({
    description: 'jwt 토큰',
    type: String,
    default: 'jwt',
  })
  @Expose()
  token: string;
}
