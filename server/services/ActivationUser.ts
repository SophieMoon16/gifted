import { createError } from "h3"; // Nitro / Nuxt 3
import { UserModel } from "../models/UserModel";

export class ActivationUser {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async activate(token: string) {
    // 1️. Vérifier que le token est présent
    if (!token) {
      throw createError({
        statusCode: 400,
        message: "Token manquant",
      });
    }

    // 2️. Chercher l'utilisateur correspondant au token
    const user = await this.userModel.findByActivationToken(token);
    if (!user) {
      throw createError({
        statusCode: 400,
        message: "Token invalide",
      });
    }

    // 3️. Vérifier si déjà activé
    if (user.is_active) {
      throw createError({
        statusCode: 400,
        message: "Compte déjà activé",
      });
    }

    // 4️. Activer l'utilisateur
    try {
      await this.userModel.activateUser(user.id_user);
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
