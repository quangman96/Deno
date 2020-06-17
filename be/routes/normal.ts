import { Router } from "https://deno.land/x/oak/mod.ts";
import UserController from "../controllers/UserController.ts";
import AuthController from "../controllers/AuthController.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
const router = new Router();

router
  .get("/user", UserController.list)
  .get("/user/:id", UserController.findById)
  .post("/user", UserController.create)
  .patch("/user/:id", UserController.update)
  .delete("/user/:id", UserController.delete);

router
  .options("/login", oakCors())
  .post("/login", AuthController.login);

export default router;
