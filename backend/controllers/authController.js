import { createClient } from "../db/connection.ks";
import { hashPassword, comparePassword } from "../utils/hashPPassword.js";

export const register = async (req, res, next) => {
  const client = createClient();
};
