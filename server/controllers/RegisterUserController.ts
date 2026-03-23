import { UserModel } from "../models/UserModel";
import { MailerUser } from "../services/MailerUser";
import bcrypt from "bcryptjs";
import { createError } from "h3"; // <-- pour Nitro / Nuxt 3

export class RegisterUserController {
  private userModel: UserModel;
  private mailer: MailerUser;

  constructor(userModel: UserModel, mailerUser: MailerUser) {
    this.userModel = userModel;
    this.mailer = mailerUser;
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
    const existingUser = await this.userModel.findByEmail(normalizedEmail);

    if (existingUser) {
      // Déjà activé → erreur
      if (existingUser.is_active) {
        throw createError({
          statusCode: 400,
          message: "Vous possédez déjà un compte actif sur Gifted.",
        });
      }

      // Existe mais pas activé → renvoi du mail d'activation
      if (existingUser.activation_token) {
        try {
          await this.mailer.sendActivationMail(
            normalizedEmail,
            existingUser.activation_token,
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
    const activationToken = UserModel.generateActivationToken();

    try {
      await this.userModel.create({
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
