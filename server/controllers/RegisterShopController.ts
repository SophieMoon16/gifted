import { ShopModel } from "../models/ShopModel";
import { Mailer } from "../services/Mailer";
import bcrypt from "bcryptjs";
import { createError } from "h3"; // <-- pour Nitro / Nuxt 3

export class RegisterShopController {
  private shopModel: ShopModel;
  private mailer: Mailer;

  constructor(shopModel: ShopModel, mailer: Mailer) {
    this.shopModel = shopModel;
    this.mailer = mailer;
  }

  async register(requestData: {
    name?: string;
    email?: string;
    password?: string;
  }) {
    const { name, email, password } = requestData;
    const normalizedEmail = email?.trim().toLowerCase();

    // Validation des champs
    if (!name || !normalizedEmail || !password) {
      throw createError({
        statusCode: 400,
        message: "Tous les champs sont requis",
      });
    }

    // Vérifier si l'email existe déjà
    const existingShop = await this.shopModel.findByEmail(normalizedEmail);

    if (existingShop) {
      // Déjà activé → erreur
      if (existingShop.is_active) {
        throw createError({
          statusCode: 400,
          message: "Vous possédez déjà un compte actif sur Gifted.",
        });
      }

      // Existe mais pas activé → renvoi du mail d'activation
      if (existingShop.activation_token) {
        try {
          await this.mailer.sendActivationMail(
            normalizedEmail,
            existingShop.activation_token,
          );
          return {
            success: true,
            message: "Email d'activation renvoyé.",
          };
        } catch (error) {
          throw createError({
            statusCode: 500,
            message: "Impossible d'envoyer l'email, réessayez plus tard.",
          });
        }
      }
    }

    // Nouveau compte
    const passwordHash = await bcrypt.hash(password, 10);
    const activationToken = ShopModel.generateActivationToken();

    try {
      await this.shopModel.create({
        name,
        email: normalizedEmail,
        passwordHash,
        is_active: false,
        activationToken,
      });

      // Envoi du mail d'activation
      await this.mailer.sendActivationMail(normalizedEmail, activationToken);

      return {
        success: true,
        message: "Veuillez activer votre compte via l'email envoyé.",
      };
    } catch (error) {
      console.log(error);
      throw createError({
        statusCode: 500,
        message: "Impossible d'envoyer l'email, réessayez plus tard.",
      });
    }
  }
}
