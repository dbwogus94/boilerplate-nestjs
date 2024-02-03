import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity } from 'typeorm';

import { DateValidator, StringValidator } from '@app/common';
import { BaseEntity } from '../base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  /**
   * 닉네임
   * - 000 + id,
   * - default 0000
   */
  @ApiProperty({
    description: '닉네임',
    type: String,
    default: '닉네임',
    maxLength: 50,
  })
  @Expose()
  @StringValidator({ maxLength: 50 })
  @Column('varchar', { comment: '닉네임', length: 50, default: '0000' })
  nickname: string;

  /**
   * JWT 토큰
   * - defalt ''
   */
  @ApiHideProperty()
  @Exclude()
  @StringValidator({ maxLength: 300 })
  @Column('varchar', { comment: 'JWT 토큰', length: 300, default: '' })
  token: string;

  /**
   * 마지막 접속일
   * - mvp에서는 생성시 추가
   * - default now
   */
  @ApiHideProperty()
  @Exclude()
  @DateValidator()
  @Column('timestamptz', { comment: '마지막 접속일', default: () => 'NOW()' })
  accessedAt: Date;

  @ApiHideProperty()
  @Expose()
  @Column('boolean', { comment: '약관 동의', default: false })
  agreementTerms: true;
}
