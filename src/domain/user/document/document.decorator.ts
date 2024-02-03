import { applyDecorators } from '@nestjs/common';
import { UserController } from '../user.controller';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { errorMessage, successMessage } from '@app/custom';
import { GetUserResponseDTO, PostUserResponseDTO } from '../dto';
import { ApiAuthDocument, USER_ACCESS_TOKEN } from '@app/common';

type API_DOC_TYPE = keyof UserController;

// eslint-disable-next-line @typescript-eslint/ban-types
const decorators: Record<API_DOC_TYPE, Function> = {
  postUsers: () =>
    applyDecorators(
      ApiOperation({ summary: '(MVP 전용)유저 등록' }),
      ApiCreatedResponse({
        description: successMessage.S201_USER_001,
        type: PostUserResponseDTO,
      }),
      ApiBadRequestResponse({ description: errorMessage.E400_APP_001 }),
    ),
  getUser: () =>
    applyDecorators(
      ApiAuthDocument(USER_ACCESS_TOKEN),
      ApiOperation({ summary: '유저 정보 조회' }),
      ApiOkResponse({
        description: successMessage.S200_USER_001,
        type: GetUserResponseDTO,
      }),
    ),
  deleteUser: () =>
    applyDecorators(
      ApiAuthDocument(USER_ACCESS_TOKEN),
      ApiOperation({ summary: '유저 제거' }),
      ApiNoContentResponse({
        description: successMessage.S204_USER_001,
      }),
    ),
};

export const DocumentHelper = (docType: API_DOC_TYPE) => {
  return decorators[docType]();
};
