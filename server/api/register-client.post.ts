import { UserModel } from "../models/UserModel";
import { MailerUser } from "../services/MailerUser";
import { RegisterUserController } from "../controllers/RegisterUserController";

//Voici la fonction qui doit s’exécuter quand quelqu’un appelle cette route API.
export default defineEventHandler(async (event) => {
  // event regroupe la requête ET la réponse dans un seul objet.
  // Ici on lit le corps de la requête HTTP (POST ici).
  const body = await readBody(event);
  // On crée une instance de UserModel pour pouvoir interagir avec la base de données.
  const userModel = new UserModel();
  // On crée une instance de Mailer pour pouvoir envoyer des emails.
  const mailerUser = new MailerUser();
  // On crée une instance du controller en lui passant les dépendances dont il a besoin.
  const controller = new RegisterUserController(userModel, mailerUser);
  // On appelle la méthode register du controller en lui passant les données du corps de la requête, et on retourne le résultat de cette méthode comme réponse à l'appel de l'API.
  return await controller.register(body);
});
