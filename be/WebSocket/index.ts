import {
  acceptable,
} from "https://deno.land/std/ws/mod.ts";

export default async (ctx: any, next: () => Promise<void>) => {
  const req = ctx.request.serverRequest;
  if (acceptable(req)) {
    const sock = await ctx.upgrade();
    for await (const ev of sock) {
      if (typeof ev === "string") {
        console.log("ws:Text", ev);
        await sock.send(ev);
      }
    }
  } else {
    await next();
  }
};
