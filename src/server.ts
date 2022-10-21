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
    const items = await followersFeed.items();
    console.log(items); // Here you can reach items. It's array.
    const thirdPageItems = await followersFeed.items();
    // Feed is stateful and auto-paginated. Every subsequent request returns results from next page
    console.log(thirdPageItems); // Here you can reach items. It's array.
    const feedState = followersFeed.serialize(); // You can serialize feed state to have an ability to continue get next pages.
    console.log(feedState);
    followersFeed.deserialize(feedState);
    const fourthPageItems = await followersFeed.items();
    console.log(fourthPageItems);
    // You can use RxJS stream to subscribe to all results in this feed.
    // All the RxJS powerful is beyond this example - you should learn it by yourself.
    followersFeed.items$.subscribe(
      followers => console.log(followers),
      error => console.error(error),
      () => console.log('Complete!'),
    );
  })();

  res.send('Express + TypeScript Server ');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});