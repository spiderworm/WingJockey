# Wing Jockey

A long-forgotten experiment from days of yore. Please don't judge me to harshly from this, I'm much better than this now.

## Install

cd wing-jockey # the directory where you checked this out to

```bash
$ npm install

$ node ./server/index.js
```

Open up your browser to ```http://localhost:3000/client/debug/```

## It's running in my browser, what is even happening?

There's a ball in an arena. You're flying a plane. You're trying to bump or carry the ball into the other teams' goal in the arena. There were plans to give the plane grappling hooks that could latch on to the ball, on to other planes, walls, etc. If you've ever played Rocket Jockey, it would be grappling hooks like that.

There are two view modes. You start off in ball view mode. In this mode, the camera tries to always show you (the plane) and the ball in the same view. The other is front view. To toggle between the two modes, press E.

To control the plane, click the game and move the mouse. The plane is difficult to control in either mode, but especially in ball view mode. In ball view mode, the plane's orientation is also hard to gauge because it's a wireframe. Maybe I'll spend some time cleaning some of this up.
