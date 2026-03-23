// IMPORTS
// nodemailer est un module Node.js utilisée pour envoyer des emails. Elle est utilisée ici pour envoyer des emails d'activation aux utilisateurs après leur inscription.

import nodemailer from "nodemailer";

// CLASS Déclaration de la classe exportée donc utilisable ailleurs dans l'application.
// Propriété transporter
// private : cette propriété est accessible uniquement à l'intérieur de la classe Mailer.
export class MailerUser {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  // Méthode pour envoyer un email d'activation

  async sendActivationMail(email: string, token: string) {
    const link = `${process.env.APP_URL}/activate-client?token=${token}`;
    console.log("APP_URL:", process.env.APP_URL);
    console.log("Activation link:", link);

    const mailOptions = {
      from: '"Gifted" <hello@gifted.cool>',
      to: email,
      subject: "Activez votre compte",

      // Version texte simple pour les clients email qui ne supportent pas le HTML
      text: `Bonjour,

Cliquez sur le lien suivant pour activer votre compte :
${link}

Si vous n'êtes pas à l'origine de cette inscription, ignorez cet email.`,

      // Version HTML avec bouton
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Bienvenue sur Gifted 🎁</h2>
        <p>Merci pour votre inscription.</p>
        <p>Si vous n'êtes pas à l'origine de cette inscription, ignorez cet email.</p>
        <p>Cliquez sur le bouton ci-dessous pour activer votre compte :</p>

        <a href="${link}" 
           style="
             display: inline-block;
             padding: 12px 24px;
             margin: 20px 0;
             font-size: 16px;
             color: #ffffff;
             background-color:#000000;
             text-decoration: none;
             border-radius: 6px;
             font-weight: bold;
           ">
          Activer mon compte
        </a>

        <p style="font-size: 14px; color: #666;">
          Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :
        </p>
        <p style="font-size: 14px;">
          ${link}
        </p>
      </div>
    `,
    };

    //Envoi réel de l’email via SMTP.
    await this.transporter.sendMail(mailOptions);
  }
}
