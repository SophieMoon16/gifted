import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ShopModel } from "../models/ShopModel";

export class AuthShop {
  private shopModel = new ShopModel();

  // Retourne le token uniquement
  async login(email: string, password: string) {
    //console.log("Email reçu :", email);
    const shop = await this.shopModel.findByEmail(email);
    //console.log("Shop trouvé :", shop);

    if (!shop) {
      throw new Error("Email ou mot de passe incorrect");
    }

    if (!shop.is_active) {
      throw new Error("Compte non activé");
    }

    const isMatch = await bcrypt.compare(password, shop.password_hash);
    //console.log("Password match:", isMatch); // Debug log

    if (!isMatch) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const maxSeconds = Number(process.env.JWT_EXPIRES);

    // Génère JWT
    const token = jwt.sign(
      { id: shop.id_shop },
      process.env.JWT_SECRET as string,
      { expiresIn: maxSeconds },
    );

    //console.log("Generated token:", token);
    return token;
  }
}
