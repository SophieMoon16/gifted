import { AuthClientController } from "../controllers/AuthClientController";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  const controller = new AuthClientController();
  return await controller.login(event, email, password);
});
