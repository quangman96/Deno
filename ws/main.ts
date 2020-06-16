import { serve } from "https://deno.land/std/http/server.ts";
import handleWebSocket from "./ws.ts";
import {
  acceptWebSocket,
  acceptable,
} from "https://deno.land/std/ws/mod.ts";

async function main() {
  console.log("192.168.145.101:4000");

  for await (const req of serve("192.168.145.101:4000" )) {
    if (acceptable(req)) {
      const { conn, headers, w: bufWriter, r: bufReader } = req;
      acceptWebSocket({ conn, headers, bufReader, bufWriter }).then(
        handleWebSocket
      );
    } else {
      if (req.method === "GET" && req.url === "/") {
        req.respond({
          headers: new Headers({ "Content-Type": "text/html" }),
          body: await Deno.open("./view.html"),
        });
      } else {
        req.respond({ body: "Not Found", status: 404 });
      }
    }
  }
}

main();
