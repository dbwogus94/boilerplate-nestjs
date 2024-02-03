export type PrimitiveType = string | number | boolean;
export type PrimitiveArrayType = string[] | number[] | boolean[];
export type EnvType = 'production' | 'development' | 'local';

export type UserInfo = {
  id: number;
  jwt: string;
};
export type UserRequest = Request & { user: UserInfo };
