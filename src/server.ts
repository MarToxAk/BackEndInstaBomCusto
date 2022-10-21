import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {Server} from 'socket.io'
import {createServer} from 'http'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const server = createServer(app);
const io = new Server(server);


io.on("connection", (...params) => {
    console.log(params);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server ');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});