import { AuthShop } from "../services/AuthShop";
import { setCookie } from "h3";

export class AuthShopController {
  private authService: AuthShop;

  constructor() {
    this.authService = new AuthShop();
  }

  // Login
  async login(event: any, email: string, password: string) {
    const token = await this.authService.login(email, password);
    const maxSeconds = Number(process.env.JWT_EXPIRES);
    // Stocke le JWT dans un cookie httpOnly
    setCookie(event, "token", token, {
      httpOnly: true,
      secure: false, // à true en production avec HTTPS
      sameSite: "strict",
      maxAge: maxSeconds,
      path: "/",
    });

    return { success: true, message: "Connexion réussie" };
  }
}
