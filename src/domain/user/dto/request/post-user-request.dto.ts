import { ApiProperty, PickType } from '@nestjs/swagger';

import { BooleanValidator } from '@app/common';
import { UserEntity } from '@app/entity';
import { Expose } from 'class-transformer';
import { Equals } from 'class-validator';

export class PostUserRequestDTO extends PickType(UserEntity, ['nickname']) {
  @ApiProperty({
    description: '약관 동의(false 불가)',
    type: Boolean,
    default: true,
  })
  @Expose()
  @BooleanValidator()
  @Equals(true)
  agreementTerms: true;
}
