const video = document.querySelector('.player'); // class of player
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d'); // context is where the work happens
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap'); // audio 

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream); // in order for our video to work it needs to be converted to some sort of url. This is done by wrapping the localMediaStream with window.URL.createObjectURL
      // video.play(); //opens up the video and plays at the top right of the page
    });
}

getVideo();
