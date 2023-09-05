// S + statusCode + 컨트롤러 + 넘버링
export const successMessage = {
  S200APP001: '성공',
};

// E + statusCode + 컨트롤러 + 넘버링
export const errorMessage = {
  E400APP001: '요청이 유효성 검사를 통과하지 못하였습니다.',
  E404APP001: '요청한 자원이 존재하지 않거나 사용할 수 없습니다.',
  E401APP001: '인증 정보가 잘못되었습니다.',

  E400LESSON001: '존재하지 않는 코치 입니다.',

  E400LESSON002:
    '정기레슨으로 조회하는 경우 주당 횟수(frequency)는 필수로 존재해야합니다.',
};
