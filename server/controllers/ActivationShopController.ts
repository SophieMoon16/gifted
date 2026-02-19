import { ActivationShop } from "../services/ActivationShop";

export class ActivationShopController {
  private activation: ActivationShop;

  constructor(activation: ActivationShop) {
    this.activation = activation;
  }

  // Méthode qui sera appelée depuis la route GET /api/activate?token=xxx
  async activate(token?: string) {
    try {
      // 1️. Vérifie que le token est fourni
      if (!token) {
        return { success: false, message: "Token manquant" };
      }

      // 2️. Appelle le service pour activer le shop
      const result = await this.activation.activate(token);

      // 3️. Retourne la réponse succès
      return {
        success: true,
        message: result.message,
      };
    } catch (error: any) {
      // 4️. Capture et retourne les erreurs provenant du service
      return {
        success: false,
        message: error.message || "Erreur lors de l'activation",
      };
    }
  }
}
