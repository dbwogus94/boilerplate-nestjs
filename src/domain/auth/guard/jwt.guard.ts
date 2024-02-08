import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserRequest, errorMessage } from '@app/common';
import { AuthServiceUseCase } from '../auth.service';
import { BaseJwtGuard } from './base-jwt.guard';

@Injectable()
export class JwtGuard extends BaseJwtGuard {
  constructor(private readonly authService: AuthServiceUseCase) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest<UserRequest>(context);
    const jwt = this.getJwt(request);
    if (!jwt) throw new UnauthorizedException(errorMessage.E401_APP_001);

    const payload = this.authService.decodeToken(jwt);
    if (!payload) throw new UnauthorizedException(errorMessage.E401_APP_001);

    const userInfo = { uid: payload.uid, id: payload.id, jwt };
    const isValid = await this.authService.isValid(userInfo);
    if (!isValid) throw new UnauthorizedException(errorMessage.E401_APP_001);

    request.user = userInfo;
    return true;
  }
}
