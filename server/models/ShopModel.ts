// IMPORTS
// crypto est un module natif Node.js utilisé pour générer un token d'activation unique pour chaque boutique lors de l'inscription.
// pool est importé depuis utils/db et représente la connexion à la base de données PostgreSQL.

import crypto from "crypto";
import { pool } from "../utils/db";

// INTERFACE
// ShopData définit la structure des données nécessaires pour créer une boutique dans la base de données, incluant le nom, l'email, le hash du mot de passe et le token d'activation.

export interface ShopData {
  name: string;
  email: string;
  passwordHash: string;
  is_active: boolean;
  activationToken: string;
}
// CLASS
// ShopModel contient les méthodes pour interagir avec la table "shops" de la base de données, notamment pour trouver une boutique par email et pour créer une nouvelle boutique. Il inclut également une méthode statique pour générer un token d'activation unique.
// Propriété db private (accessible uniquement à l'intérieur de la classe) qui utilise le pool de connexion à la base de données pour exécuter des requêtes SQL.
// this : pour accéder à la propriété db de l'instance de ShopModel.
// Trois méthodes principales : findByEmail pour rechercher une boutique par email, et create pour insérer une nouvelle boutique dans la base de données. La méthode statique generateActivationToken génère un token d'activation unique pour chaque boutique lors de l'inscription.
export class ShopModel {
  private db = pool;

  async findByEmail(mail: string) {
    const res = await this.db.query("SELECT * FROM shops WHERE email = $1", [
      mail,
    ]);
    return res.rows[0] || null;
  }
  // La méthode create exécute une requête SQL pour insérer une nouvelle boutique dans la table "shops" avec les données fournies, et retourne l'id de la boutique créée.
  async create(data: ShopData) {
    const res = await this.db.query(
      `INSERT INTO shops (name, email, password_hash, is_active, activation_token, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id_shop`,
      [
        data.name,
        data.email,
        data.passwordHash,
        data.is_active,
        data.activationToken,
      ],
    );
    return res.rows[0].id_shop;
  }

  // La méthode statique generateActivationToken utilise le module crypto pour générer un token d'activation unique de 16 octets, converti en chaîne hexadécimale, qui sera utilisé pour activer le compte de la boutique après l'inscription.
  // static : cette méthode n'a pas besoin d'accéder à des propriétés d'instance de la classe ShopModel, elle peut être appelée directement sur la classe sans créer une instance.
  static generateActivationToken() {
    return crypto.randomBytes(16).toString("hex");
  }

  // La méthode findByActivationToken exécute une requête SQL pour rechercher une boutique dans la table "shops" en fonction du token d'activation fourni, et retourne les données de la boutique correspondante ou null si aucune boutique n'est trouvée.
  async findByActivationToken(token: string) {
    const res = await this.db.query(
      "SELECT * FROM shops WHERE activation_token=$1",
      [token],
    );
    return res.rows[0] || null;
  }
  // La méthode activateShop exécute une requête SQL pour mettre à jour le champ is_active de la boutique correspondante à l'id fourni, en le définissant sur true, ce qui indique que le compte de la boutique est activé.
  async activateShop(id: number) {
    await this.db.query(
      "UPDATE shops SET is_active = true WHERE id_shop = $1",
      [id],
    );
  }
}
