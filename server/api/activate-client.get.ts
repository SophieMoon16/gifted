import { ActivationUserController } from "../controllers/ActivationUserController";
import { ActivationUser } from "../services/ActivationUser";

export default defineEventHandler(async (event) => {
  const token = getQuery(event).token as string;

  const activation = new ActivationUser();
  const controller = new ActivationUserController(activation);

  return await controller.activate(token);
});
