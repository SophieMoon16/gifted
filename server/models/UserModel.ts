// IMPORTS
// crypto est un module natif Node.js utilisé pour générer un token d'activation unique pour chaque boutique lors de l'inscription.
// pool est importé depuis utils/db et représente la connexion à la base de données PostgreSQL.

import crypto from "crypto";
import { pool } from "../utils/db";

// INTERFACE
// UserData définit la structure des données nécessaires pour créer un utilisateur dans la base de données, incluant le nom, l'email, le hash du mot de passe et le token d'activation.

export interface UserData {
  name: string;
  email: string;
  passwordHash: string;
  is_active: boolean;
  activationToken: string;
}
// CLASS
// UserModel contient les méthodes pour interagir avec la table "users" de la base de données, notamment pour trouver un utilisateur par email et pour créer un nouvel utilisateur. Il inclut également une méthode statique pour générer un token d'activation unique.
// Propriété db private (accessible uniquement à l'intérieur de la classe) qui utilise le pool de connexion à la base de données pour exécuter des requêtes SQL.
// this : pour accéder à la propriété db de l'instance de UserModel.
// Trois méthodes principales : findByEmail pour rechercher un utilisateur par email, et create pour insérer un nouvel utilisateur dans la base de données. La méthode statique generateActivationToken génère un token d'activation unique pour chaque utilisateur lors de l'inscription.
export class UserModel {
  private db = pool;

  async findByEmail(mail: string) {
    const res = await this.db.query("SELECT * FROM users WHERE email = $1", [
      mail,
    ]);
    return res.rows[0] || null;
  }
  // La méthode create exécute une requête SQL pour insérer un nouvel utilisateur dans la table "users" avec les données fournies, et retourne l'id de l'utilisateur créé.
  async create(data: UserData) {
    const res = await this.db.query(
      `INSERT INTO users (firstname, email, password_hash, is_active, activation_token, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id_user`,
      [
        data.name,
        data.email,
        data.passwordHash,
        data.is_active,
        data.activationToken,
      ],
    );
    return res.rows[0].id_user;
  }

  // La méthode statique generateActivationToken utilise le module crypto pour générer un token d'activation unique de 16 octets, converti en chaîne hexadécimale, qui sera utilisé pour activer le compte de la boutique après l'inscription.
  // static : cette méthode n'a pas besoin d'accéder à des propriétés d'instance de la classe ShopModel, elle peut être appelée directement sur la classe sans créer une instance.
  static generateActivationToken() {
    return crypto.randomBytes(16).toString("hex");
  }

  // La méthode findByActivationToken exécute une requête SQL pour rechercher une boutique dans la table "shops" en fonction du token d'activation fourni, et retourne les données de la boutique correspondante ou null si aucune boutique n'est trouvée.
  async findByActivationToken(token: string) {
    const res = await this.db.query(
      "SELECT * FROM users WHERE activation_token=$1",
      [token],
    );
    return res.rows[0] || null;
  }
  // La méthode activateUser exécute une requête SQL pour mettre à jour le champ is_active de l'utilisateur correspondant à l'id fourni, en le définissant sur true, ce qui indique que le compte de l'utilisateur est activé.
  async activateUser(id: number) {
    await this.db.query(
      "UPDATE users SET is_active = true WHERE id_user = $1",
      [id],
    );
  }
}
