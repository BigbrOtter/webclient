function loadStream(){
  if (flvjs.isSupported()) {
      var videoElement = document.getElementById('videoElement');
      var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: 'ws://145.49.34.4:8000/live/kevin.flv'
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
  }
}
