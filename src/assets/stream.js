function loadStream(id){
  if (flvjs.isSupported()) {
    var videoElement = document.getElementById(id);
    var flvPlayer = flvjs.createPlayer({
        type: 'hls',
        url: ''
    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
  }
}



