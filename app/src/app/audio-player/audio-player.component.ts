import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  public status : number = 0;
  public currentSong : any = {title: "Más Network Coro", artist: "97.9 FM"};
  public audioPlayer! : HTMLAudioElement;

  constructor(public http : HttpClient) { }

  ngOnInit(): void {
    this.audioPlayer = <HTMLAudioElement> document.getElementById("audio-player");

    this.audioPlayer.onplay = () => {
      this.status = 1;
    }

    this.audioPlayer.onplaying = () => {
      this.status = 2;
    }

    this.audioPlayer.onpause = () => {
      this.status = 0;
    }

    this.audioPlayer.onerror = () => {
      this.status = 0;
    }

    /* this.getCurrentSong();

    setInterval(() => {
      this.getCurrentSong();
    }, 5000); */
  }

  play(){
    this.audioPlayer.load();
    this.audioPlayer.play();   
  }

  pause(){
    this.audioPlayer.pause();
  }

  getCurrentSong(){
    this.http.get("https://masnetworkcoro.com/nowplaying.php").subscribe((data : any) => {
      this.currentSong = data.nowplaying;
    });
  }

}
