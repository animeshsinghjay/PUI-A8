# VideoParty

An app to watch videos in sync with your friends
Link to Demo: https://youtu.be/TZr0rlPH_X8 

## Client Side

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.4.
The app will automatically reload if you change any of the source files. 
Run `npm start` at /video-party-server to start.

## Server Side

Run `./server` at /video-party-server/go-party-server to start. 

## Video Player View

Open `http://localhost:4200/` in multiple tabs. When the video is played/ paused in any one of these players, it is automatically synced with the remaining players. 

## Responsive and Accessible 

The web app is responsive as it is based on Bootstrap's 12-column layout. It resizes when viewport size is changed. The website also follows accessibility standards, has passed the test from the WAVE web accessibility evaluation tool. 

## Demo Video Disclaimer

The demo video shows the initial part of the user flow (uploading video onto the web app) on a Windows interface. Then the latter part of the user flow (video player, syncing of video) is on an Ubuntu interface. The reason for this is that I first figured out the upload part when I was using Windows (by setting up a local Apache server using XAMPP), and later (for the sake of keeping my sanity) switched to Ubuntu for the video sync part because it involved setting up multiple servers (Go, AngularJS, Python). I couldn’t figure out how to perform the video upload on Ubuntu because of the lack of error messages from PHP, and the local Apache server (and it having a billion dependencies). Anyway, I felt that it was not a super important aspect, so I decided not to spend more time figuring out the Apache server on Ubuntu, as I had already done it on Windows. Hence the only assumption is that the video file is taken from the user’s directory and put into the /uploads directory. The python3 http server is set up in this directory which hosts the video on localstorage. 

## Extra Credit 

I added compatibility for screen readers by following the ARIA guidelines. 
Link to Screen Reader Demo: https://youtu.be/qnxfM2jdKaQ