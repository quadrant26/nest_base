# nest_base

### 部分技巧

+ 设置局部路由前缀

    ```javascript
        // 在控制器的装饰器 @Controller() 
        @Controller('user')
    ``` 

+ 设置全局路由前缀

    ```node
        // src/main.ts
        app.setGlobalPrefix('nest-zero-to-one'); // 全局路由前缀
    ```

### 连接 mysql
  
+ 安装依赖

  ```javascript
    yarn add sequelize sequelize-typescript mysql2 -S
    yarn add @types/sequelize -D // 提示
  ```

  + mysql 配置文件

    ```javascript
      // config/db.ts
      const productConfig = {
        mysql: {
          port: '数据库端口',
          host: '数据库地址',
          user: '用户名',
          password: '密码',
          database: 'nest_zero_to_one', // 库名
          connectionLimit: 10, // 连接限制
        },
      };
      export default productConfig;
    ```

+ 连接数据库
    
  ```javascript
    // src/database/sequelize.ts
    import { Sequelize } from 'sequelize-typescript';
    import db from '../../config/db';
      
    const sequelize = new Sequelize(
      db.mysql.database, 
      db.mysql.user, 
      db.mysql.password || null, 
      {
        // 自定义主机; 默认值: localhost
        host: db.mysql.host, // 数据库地址
        // 自定义端口; 默认值: 3306
        port: db.mysql.port,
        dialect: 'mysql',
        pool: {
          max: db.mysql.connectionLimit, // 连接池中最大连接数量
          min: 0, // 连接池中最小连接数量
          acquire: 30000,
          idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
        },
        timezone: '+08:00', // 东八时区
      });
    ```
  
### jwt 验证
  
+ 安装依赖

  ```
    yarn add passport passport-jwt passport-local @nestjs/passport @nestjs/jwt -S
    yarn add @types/passport-jwt -D
  ```
  
+ **secret** 常量
  
  ```javascript
    
    // src/logical/auth/constats.ts
    export const jwtConstants = {
      secret: 'shinobi7414' // 秘钥
    };
  
  ```

+ jwt 策略

  [jwt策略文件](./nest-server/src/logical/auth/jwt.strategy.ts)

  [jwt secret 常量](./nest-server/src/logical/auth/constats.ts)

+ jwt 本地策略

  [jwt本地策略文件](./nest-server/src/logical/auth/local.strategy.ts)