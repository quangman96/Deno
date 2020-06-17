import db from "../config/databases.ts";
const userCollection = db.collection("users");
import validation from "../validation.ts";
import hash from "../util/hash.ts";
import token from "../util/token.ts";

export default {
  async login(ctx: any) {
    const value = await validation.validateLogin(ctx);
    if (!value) {
      return;
    }

    // fetch user
    const user = await userCollection.findOne({ email: value.email });
    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = {
        errors: { message: "Credentials doesn't match out record" },
      };
      return;
    }

    // verify password
    const passwordMatched = await hash.verify(user.password, value.password);
    if (!passwordMatched) {
      ctx.response.status = 422;
      ctx.response.body = {
        errors: { message: "Password is incorrect" },
      };                      
      return;
    }

    ctx.response.body = token.generate(user._id.$oid);
  },
};
