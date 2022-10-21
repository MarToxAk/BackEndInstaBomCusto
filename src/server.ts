import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {Server} from 'socket.io'
import {createServer} from 'http'
import { IgApiClient } from 'instagram-private-api';



dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const ig_username: string = `${process.env.IG_USERNAME}`
const ig_password: string = `${process.env.IG_PASSWORD}`
const server = createServer(app);
const io = new Server(server);


io.on("connection", (...params) => {
    console.log(params);
  });

app.get('/', (req: Request, res: Response) => {
  
  const teste = (async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(ig_username);
    const auth = await ig.account.login(ig_username, ig_password);
    const followersFeed = ig.feed.accountFollowers(auth.pk);
    const wholeResponse = await followersFeed.request();
    console.log(wholeResponse); // You can reach any properties in instagram response
    const procurar = ig.searchForUser(auth, "bomcustopapelaria")
    console.log(ig.getById(procurar.pk))
  })();

  res.send('Express + TypeScript Server ');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});