import { Statement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {VgApiService} from '@videogular/ngx-videogular/core';
import { interval } from 'rxjs';
import {StatusService} from './status.service';
import {State} from './status.service';

export interface IMedia {
  title: string;
  src: string;
  type: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [StatusService]
})

export class AppComponent {

  api: VgApiService;

  constructor(private statusService: StatusService){}

  playlist: Array<IMedia> = [
    {
        title: 'Video to share',
        src: '/assets/try.mp4',
        type: 'video/mp4'
    },
    // {
    //     title: 'Big Buck Bunny',
    //     src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
    //     type: 'video/mp4'
    // },
    // {
    //     title: 'Elephants Dream',
    //     src: 'http://static.videogular.com/assets/videos/elephants-dream.mp4',
    //     type: 'video/mp4'
    // }
  ];

  currentIndex = 0;
  currentItem: IMedia = this.playlist[ this.currentIndex ];

  onClickPlaylistItem(item: IMedia, index: number) {
    this.currentIndex = index;
    this.currentItem = item;
  }

  onPlayerReady(api: VgApiService) {
    this.api = api;
    console.log(this.api.getDefaultMedia().subscriptions);
    interval(100).subscribe(x => {
      this.findStatus();
    });
  }

  // playVideo() {
  //   this.api.play();
  // }

  // nextVideo() {
  //   this.currentIndex++;

  //   if (this.currentIndex === this.playlist.length) {
  //       this.currentIndex = 0;
  //   }

  //   this.currentItem = this.playlist[this.currentIndex];
  // }

  // skipTime() {
  //   this.api.seekTime(20, false);
  //   this.api.play();
  // }

  findStatus() {
    // console.log(this.api.state);
    this.statusService.getStatus().subscribe((data: State) => {
      if (this.api.state == "playing" && data.status == "pause") {
        this.api.pause();
        // this.api.seekTime(data.time, false);
      } else if (this.api.state == "paused" && data.status == "play") {
        // this.api.seekTime(data.time, false);
        this.api.play();
      } else if (this.api.state == "paused" && data.status == "paused" &&
        this.api.currentTime != data.time) {
        // this.api.seekTime(data.time, false);
      }
    });
  }

  // onPlayTriggered() {
  //   // console.log(this.api.state);
  //   console.log("Setting the state as ", "play", this.api.currentTime);
  //   this.statusService.setStatus("play",this.api.currentTime).subscribe();
  // }

  // onPauseTriggered() {
  //   // console.log(this.api.state);
  //   console.log("Setting the state as ", "pause", this.api.currentTime);
  //   this.statusService.setStatus("pause",this.api.currentTime).subscribe();
  // }

  // onUpdateStateFunc(state: any){
  //   console.log("The state is", state)
  // }

  takeClick(){
    // console.log(this.api.state);
    if (this.api.state === "paused") {
      this.statusService.setStatus("play",this.api.currentTime).subscribe();
    } else {
      this.statusService.setStatus("pause",this.api.currentTime).subscribe();
    }
  }

  scrubClick(){
    this.api.seekTime(this.api.currentTime, false);
    this.api.pause();
    this.statusService.setStatus("pause",this.api.currentTime).subscribe();
  }

  // logStatus(){
  //   console.log("Status is", this.api.state);
  // }
}
