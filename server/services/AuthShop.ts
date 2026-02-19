import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ShopModel } from "../models/ShopModel";
import { createError } from "h3"; // Nitro / Nuxt 3

export class AuthShop {
  private shopModel = new ShopModel();

  // Retourne le token uniquement
  async login(email: string, password: string) {
    const shop = await this.shopModel.findByEmail(email);

    if (!shop) {
      throw createError({
        statusCode: 401,
        statusMessage: "Email ou mot de passe incorrect",
      });
    }

    if (!shop.is_active) {
      throw createError({
        statusCode: 403,
        statusMessage: "Compte non activé",
      });
    }

    const isMatch = await bcrypt.compare(password, shop.password_hash);
    if (!isMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: "Email ou mot de passe incorrect",
      });
    }

    const maxSeconds = Number(process.env.JWT_EXPIRES) || 3600;

    // Génère JWT
    const token = jwt.sign(
      { id: shop.id_shop },
      process.env.JWT_SECRET as string,
      { expiresIn: maxSeconds },
    );

    return token;
  }
}
