import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel";
import { createError } from "h3"; // Nitro / Nuxt 3

export class AuthClient {
  private userModel = new UserModel();

  // Retourne le token uniquement
  async login(email: string, password: string) {
    const user = await this.userModel.findByEmail(email);

    if (!user) {
      throw createError({
        statusCode: 401,
        message: "Email ou mot de passe incorrect",
      });
    }

    if (!user.is_active) {
      throw createError({
        statusCode: 403,
        message: "Compte non activé",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw createError({
        statusCode: 401,
        message: "Email ou mot de passe incorrect",
      });
    }

    const maxSeconds = Number(process.env.JWT_EXPIRES) || 3600;

    // Génère JWT
    const token = jwt.sign(
      { id: user.id_user },
      process.env.JWT_SECRET as string,
      { expiresIn: maxSeconds },
    );

    return token;
  }
}
