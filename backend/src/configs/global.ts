const GlobalConfig = () => ({
  port: Number(process.env.PORT),
  jwtSecret: process.env.JWT_SECRET,
  jwtExp: process.env.JWT_EXP,
  database: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3000', 10),
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    logging: false,
  },
});

export default GlobalConfig;
