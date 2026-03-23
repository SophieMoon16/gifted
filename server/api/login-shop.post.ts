import { AuthShopController } from "../controllers/AuthShopController";
import { readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  console.log("body reçu par API:", body); // <--- voir ce qui arrive

  const controller = new AuthShopController();
  return await controller.login(event, email, password);
});
