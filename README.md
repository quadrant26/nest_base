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