import { AuthShop } from "../services/AuthShop";

export class AuthShopController {
  private authShop = new AuthShop();

  async login(event: any, email: string, password: string) {
    try {
      const { token, shop } = await this.authShop.login(email, password);

      return {
        success: true,
        message: "Connexion réussie !",
        shopId: shop.id_shop,
        name: shop.name,
        token,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "Erreur inconnue",
      };
    }
  }
}
