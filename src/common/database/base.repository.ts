import { DeepPartial, EntityManager, EntityTarget, Repository } from 'typeorm';
import { uuidv7 } from 'uuidv7';

export class BaseRepository<Entity> extends Repository<Entity> {
  constructor(
    readonly targetEntity: EntityTarget<Entity>,
    readonly manager: EntityManager,
  ) {
    super(targetEntity, manager, manager.queryRunner);
  }

  /**
   * queryRunner.manager를 주입받아 트랜잭션에 사용할 새로운 Repository 생성 리턴한다.
   * @param manager - queryRunner.manager
   * @Url [ github | Repository#extend()](https://github.com/typeorm/typeorm/blob/master/src/repository/Repository.ts#L697C5-L697C11) 와 동일한 역할 수행
   * @Url [typeorm 공식문서](https://typeorm.io/custom-repository#how-to-create-custom-repository)
   */
  createTransactionRepo(manager: EntityManager): this {
    const constructor = this.constructor;
    if (!manager.queryRunner) {
      throw new Error('EntityManager does not have queryRunner.');
    }
    if (constructor.name === 'CustomRepository') {
      throw new Error('Instance is not CustomRepository child.');
    }
    return new (constructor as any)(manager);
  }

  /**
   * uuidv7 라이브러리를 사용하여 uuid 생성
   * @returns
   */
  generateUid(): string {
    return uuidv7();
  }

  /**
   * super.create를 override한 메서드로 uid를 생성한다.
   * - param에 uid가 있으면 parma의 uid를 사용한다.
   * - 새 엔티티 인스턴스를 생성합니다.
   */
  override create(): Entity;
  /**
   * super.create를 override한 메서드로 uid를 생성한다.
   * - 새 엔티티를 생성하고 지정된 객체의 모든 엔티티 속성을 새 엔티티로 복사합니다.
   * - param에 uid가 있으면 parma의 uid를 사용한다.
   */
  override create(entityLike: DeepPartial<Entity>): Entity;
  /**
   * super.create를 override한 메서드로 uid를 생성한다.
   * - 새 엔티티를 생성하고 지정된 객체의 모든 엔티티 속성을 새 엔티티로 복사합니다.
   * - param에 uid가 있으면 parma의 uid를 사용한다.
   */
  override create(entityLikeArray: DeepPartial<Entity>[]): Entity[];
  /**
   * super.create를 override한 메서드로 uid를 생성한다.
   * - 새 엔티티를 생성하고 지정된 객체의 모든 엔티티 속성을 새 엔티티로 복사합니다.
   * - param에 uid가 있으면 parma의 uid를 사용한다.
   */
  override create(
    params?: DeepPartial<Entity> | DeepPartial<Entity>[],
  ): Entity | Entity[] {
    const createWithGenerateUid = (param?: DeepPartial<Entity>) =>
      super.create({ uid: this.generateUid(), ...param });

    if (!params) {
      return createWithGenerateUid();
    }

    if (Array.isArray(params)) {
      return params.map(createWithGenerateUid);
    }

    return createWithGenerateUid(params);
  }
}
