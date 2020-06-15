import {
    isWebSocketCloseEvent,
    WebSocket,
  } from "https://deno.land/std/ws/mod.ts";

  interface Connection {
      name: string;
      ws: WebSocket;
  }

const connections = new Array<Connection>();
export default async function handleWebSocket(ws: WebSocket): Promise<void> {
  for await (const event of ws) {
    if (typeof event === "string") {
      const data = JSON.parse(event);
      if (data.type === "name") {
        handleRegister(connections, ws, data);
      } if(data.type === "message") {
        broadcastEvent(ws, event);
      } else {
        broadcastEvent(ws, event);  
      }
    }

    if (isWebSocketCloseEvent(event)) {
        handleClose(ws, connections);
    }
  }
}

function handleRegister(
    connections: Array<Connection>,
    ws: WebSocket,
    data: {name:string; type:string}
){
    connections.push({ name: data.name, ws });
    const registered = JSON.stringify({
        type: "name",
        message: `${data.name}, you are registered`,
    });
    ws.send(registered);
    const online = JSON.stringify({
        type: "online",
        message: {users: connections.map((connection) => connection.name)},
    });
    ws.send(online);

    const ev = JSON.stringify({
      type: "join",
      message: { name: data.name },
    });
    broadcastEvent(ws, ev);
}

function handleClose(
    ws:WebSocket,
    connections : Array<Connection>
){
    const currentConnection = connections.filter((c)=> c.ws == ws);
        if (currentConnection.length == 1){
           const ev = JSON.stringify({
            type: "left",
            message: { name: currentConnection[0].name},
        }); 
        broadcastEvent(ws,ev);
        }
        connections.splice(connections.indexOf(currentConnection[0]),1);
}

function broadcastEvent(ws: WebSocket, event: string) {
    for (const connection of connections) {
      if (connection.ws !== ws) {
        connection.ws.send(event);
      }
    }
  }