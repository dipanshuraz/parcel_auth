require("dotenv").config();

export const NODE_ENV = process.env.NODE_ENV;
export const DB = process.env.DATABASE_CLOUD;
export const SECRET = process.env.APP_SECRET;
export const DOMAIN = process.env.APP_DOMAIN;
export const MESSAGE = process.env.MESSAGE;
export const PORT = process.env.PORT || 3000;
