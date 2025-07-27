function downloadVideo() {
  const videoURL = document.getElementById('main-video').src;
  const a = document.createElement('a');
  a.href = videoURL;
  a.download = 'InkTube-Video.mp4';
  a.click();
}
