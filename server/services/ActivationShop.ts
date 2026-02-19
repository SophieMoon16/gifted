import { ShopModel } from "../models/ShopModel";

export class ActivationShop {
  private shopModel: ShopModel;

  constructor() {
    this.shopModel = new ShopModel();
  }

  async activate(token: string) {
    // 1️. Vérifier que le token est présent
    if (!token) {
      throw new Error("Token manquant");
    }

    // 2️. Chercher le shop correspondant au token
    const shop = await this.shopModel.findByActivationToken(token);

    if (!shop) {
      throw new Error("Token invalide");
    }

    // 3️. Vérifier si déjà activé
    if (shop.is_active) {
      throw new Error("Compte déjà activé");
    }

    // 4️. Activer le shop
    await this.shopModel.activateShop(shop.id_shop);

    return { message: "Compte activé avec succès" };
  }
}
