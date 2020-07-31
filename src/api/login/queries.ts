import { query } from "../../db";

export const findUserByCredentials = ({ email, password }) =>
 query ('SELECT * FROM users WHERE email = $1 AND password = $2') ([ email, password ]);
