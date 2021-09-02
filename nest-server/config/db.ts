// config.ts

const localConfig = {
  mysql: {
    port: '3306',
    host: 'locahost',
    user: 'root',
    password: '123456',
    database: 'nest_zero_to_one',
    connectionLimit: 10,
  },
};

const productConfig = {
  mysql: {
    port: '3306',
    host: 'locahost',
    user: 'root',
    password: '123456',
    database: 'nest_zero_to_one',
    connectionLimit: 10,
  },
};

// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : localConfig;

export default config;
