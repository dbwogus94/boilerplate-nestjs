# nestjs 보일러 플레이트 

- nestjs 버전: v10.x.x
- @nestjs/cli: v10.1.17

## env 파일
```
NODE_ENV=local

## app
TZ=Asia/Seoul
PORT=3000
CORS_ORIGIN=*
APP_NAME='API'

## TypeORM
DATABASE_TYPE=postgresql
DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_LOG=all
# ex. DATABASE_LOG=query,info,warn,error

### (optional) postgresql connection custom setting
DATABASE_MAX_QUERY_EXECUTION_TIME=10000  # 지연 로그 출력 시간(ms), ex. 10000 = 10초 이상 쿼리 로그 출력
DATABASE_CONNECT_TIMEOUT=60000	         # 쿼리 강제 취소 시간(ms), ex. 60000 = 1분 이상 쿼리 강제 취소
DATABASE_POOL_MIN_SIZE=5 
DATABASE_POOL_MAX_SIZE=10

## swagger
SWAGGER_APIS_TITLE='Nestjs API'
SWAGGER_APIS_DESCRIPTION='Nestjs API'
SWAGGER_APIS_VERSION=1.0
```
