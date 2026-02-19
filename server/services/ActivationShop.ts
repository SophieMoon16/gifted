import { ShopModel } from "../models/ShopModel";
import { createError } from "h3"; // Nitro / Nuxt 3

export class ActivationShop {
  private shopModel: ShopModel;

  constructor() {
    this.shopModel = new ShopModel();
  }

  async activate(token: string) {
    // 1️. Vérifier que le token est présent
    if (!token) {
      throw createError({
        statusCode: 400,
        message: "Token manquant",
      });
    }

    // 2️. Chercher le shop correspondant au token
    const shop = await this.shopModel.findByActivationToken(token);
    if (!shop) {
      throw createError({
        statusCode: 400,
        message: "Token invalide",
      });
    }

    // 3️. Vérifier si déjà activé
    if (shop.is_active) {
      throw createError({
        statusCode: 400,
        message: "Compte déjà activé",
      });
    }

    // 4️. Activer le shop
    try {
      await this.shopModel.activateShop(shop.id_shop);
    } catch (error) {
      console.log(error);
      throw createError({
        statusCode: 500,
        message: "Impossible d'activer le compte, réessayez plus tard.",
      });
    }

    // Succès
    return { message: "Compte activé avec succès" };
  }
}
