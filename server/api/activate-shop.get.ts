import { ActivationShopController } from "../controllers/ActivationShopController";
import { ActivationShop } from "../services/ActivationShop";

export default defineEventHandler(async (event) => {
  const token = getQuery(event).token as string;

  const activation = new ActivationShop();
  const controller = new ActivationShopController(activation);

  return await controller.activate(token);
});
