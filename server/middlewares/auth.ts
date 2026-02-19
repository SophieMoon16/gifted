import { getCookie, createError, defineEventHandler } from "h3";
import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const token = getCookie(event, "token"); // lit le cookie httpOnly

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Non authentifié" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    // stocke les infos de l'utilisateur dans context pour les routes suivantes
    event.context.user = decoded;
  } catch {
    throw createError({ statusCode: 401, statusMessage: "Token invalide" });
  }
});
