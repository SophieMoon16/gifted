// IMPORTS modèle ShopModel qui gère l'acc_ès à la BDD.
// Mailer : service pour envoyer des emails d'activation après l'inscription d'un commerçant.
// bcrypt : bibliothèque pour hasher les mots de passe avant de les stocker en BDD, assurant ainsi une meilleure sécurité.
import { ShopModel } from "../models/ShopModel";
import { Mailer } from "../services/Mailer";
import bcrypt from "bcryptjs";
// CLASS Création de la classe RegisterShopController qui gère la logique d'inscription des commerçants. Elle utilise le ShopModel pour interagir avec la base de données et le Mailer pour envoyer des emails d'activation.

export class RegisterShopController {
  private shopModel: ShopModel;
  private mailer: Mailer;

  constructor(shopModel: ShopModel, mailer: Mailer) {
    this.shopModel = shopModel;
    this.mailer = mailer;
  }
  // Méthode principale pour gérer l'inscription d'un commerçant. Elle prend en entrée un objet contenant le nom, l'email et le mot de passe du commerçant.
  // RequestData : objet contenant les données d'inscription du commerçant (name, email, password).
  // ? : indique que ces champs sont optionnels, mais la méthode vérifie ensuite qu'ils sont tous présents avant de continuer.
  // body (dans l’API) devient requestData (dans le controller) Parce que c’est l’argument que je lui passe.
  async register(requestData: {
    name?: string;
    email?: string;
    password?: string;
  }) {
    // Destructuration des données d'inscription. On récupère le nom, l'email et le mot de passe du commerçant à partir de l'objet requestData.
    const { name, email, password } = requestData;

    //trim() → enlève espaces avant/après. toLowerCase() → évite doublons type Test@gmail.com. ? → évite erreur si email est undefined
    const normalizedEmail = email?.trim().toLowerCase();

    // Validation backend : vérifier que tous les champs sont présents. Si l'un des champs est manquant, on retourne une réponse d'erreur indiquant que tous les champs sont requis.
    if (!name || !normalizedEmail || !password) {
      return { success: false, message: "Tous les champs sont requis" };
    }

    //  Vérifier si l'email existe déjà
    const existingShop = await this.shopModel.findByEmail(normalizedEmail);

    // 3 cas possibles : si l'email existe déjà et est activé → erreur email déjà utilisé. Si l'email existe mais pas activé → on renvoie le mail d'activation avec le token existant. Si l'email n'existe pas → on crée le compte, génère un token d'activation et envoie le mail d'activation.
    if (existingShop) {
      //  1. Déjà activé → email utilisé
      if (existingShop.is_active) {
        return {
          success: false,
          message: "Vous possédez déjà un compte actif sur Gifted.",
        };
      }

      //  2. Existe mais pas activé → on renvoie le mail avec le token existant
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
          console.log(error);
          return {
            success: false,
            message: "Impossible d'envoyer l'email, réessayez plus tard.",
          };
        }
      }
    }

    //  3. Nouveau compte
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
      // Envoi de l'email d'activation
      await this.mailer.sendActivationMail(normalizedEmail, activationToken);
      // SI succès → message de succès indiquant que le commerçant doit activer son compte via l'email envoyé.
      return {
        success: true,
        message: "Veuillez activer votre compte via l'email envoyé.",
      };

      // SI échec envoie mail ou erreur bdd  → message d'erreur indiquant qu'il est impossible d'envoyer l'email et de réessayer plus tard.
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Impossible d'envoyer l'email, réessayez plus tard.",
      };
    }
  }
}
