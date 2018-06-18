function loadStream(id){
  if (flvjs.isSupported()) {
      var videoElement = document.getElementById(id);
      var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: 'ws://145.49.34.4:8000/live/kevin.flv'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
  }
}
