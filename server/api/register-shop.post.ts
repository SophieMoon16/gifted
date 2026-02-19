// IMPORTS
import { ShopModel } from "../models/ShopModel";
import { Mailer } from "../services/Mailer";
import { RegisterShopController } from "../controllers/RegisterShopController";

//Voici la fonction qui doit s’exécuter quand quelqu’un appelle cette route API.
export default defineEventHandler(async (event) => {
  // event regroupe la requête ET la réponse dans un seul objet.
  // Ici on lit le corps de la requête HTTP (POST ici).
  const body = await readBody(event);
  // On crée une instance de ShopModel pour pouvoir interagir avec la base de données.
  const shopModel = new ShopModel();
  // On crée une instance de Mailer pour pouvoir envoyer des emails.
  const mailer = new Mailer();
  // On crée une instance du controller en lui passant les dépendances dont il a besoin.
  const controller = new RegisterShopController(shopModel, mailer);
  // On appelle la méthode register du controller en lui passant les données du corps de la requête, et on retourne le résultat de cette méthode comme réponse à l'appel de l'API.
  return await controller.register(body);
});
