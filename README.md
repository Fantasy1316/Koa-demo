# Koa-demo

- ### 环境变变量

需在更目录下创建一个 `.env` 文件，内容入下：

```
# app running port
APP_PORT = 3000
# mysql host
MYSQL_HOST = localhost
# mysql port
MYSQL_PORT = 3306
# mysql username
MYSQL_USER = root
# mysql password
MYSQL_PWD = ******
# mysq database name
MYSQL_DB = Koa-demo
```

- ### token 校验

在请求需要进行 token 校验的接口时，需在 Request header 中设置 `Authorization` 字段，值为 Bearer + ' ' + 登录接口返回的 token

```
header: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcl9uYW1lIjoiamF5Q2hhbmc2IiwiaXNfYWRtaW4iOnRydWUsImlhdCI6YYrFDccvDeRD2MTAwNywiZXhwIjoxNjM2NDQ3NDA3fQ.gTMHIKvFZwwY3DXHgQtlORyr_bcE8ZgesyxqFDsFISA"
}
```
