import { ActivationShop } from "../services/ActivationShop";
import { createError } from "h3"; // Nitro / Nuxt 3

export class ActivationShopController {
  private activation: ActivationShop;

  constructor(activation: ActivationShop) {
    this.activation = activation;
  }

  // Méthode pour la route GET /api/activate?token=xxx
  async activate(token?: string) {
    try {
      // 1️. Vérifie que le token est fourni
      if (!token) {
        throw createError({
          statusCode: 400,
          statusMessage: "Token manquant",
        });
      }

      // 2️. Appelle le service pour activer le shop
      const result = await this.activation.activate(token);

      // 3️. Succès → on renvoie l’objet succès
      return {
        success: true,
        message: result.message,
      };
    } catch (error: any) {
      // 4️. Relance l'erreur si c'est déjà un createError
      if (error.statusCode && error.statusMessage) throw error;

      // 5️. Sinon, crée une erreur HTTP 500 générique
      throw createError({
        statusCode: 500,
        statusMessage: error.message || "Erreur lors de l'activation",
      });
    }
  }
}
