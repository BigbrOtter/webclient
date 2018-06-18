function loadStream(id){
  if (flvjs.isSupported()) {
    var videoElement = document.getElementById(id);
    var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'http://145.49.34.4:8000/live/stream.flv'
    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
  }
}



