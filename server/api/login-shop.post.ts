import { AuthShopController } from "../controllers/AuthShopController";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const controller = new AuthShopController();
  return await controller.login(event, email, password);
});
