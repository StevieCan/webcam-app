const video = document.querySelector('.player'); // class of player
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d'); // context is where the work happens
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap'); // audio 

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream); // in order for our video to work it needs to be converted to some sort of url (convert the media stream into something that this video player can understand) . This is done by wrapping the localMediaStream with window.URL.createObjectURL
      
      // video.play(); //opens up the video and plays at the top right of the page by updating. Without this line of code, you may see the video player when you hover over the video player but it won't update in real time. 
    })
    .catch(err => {
      console.error('Warning!!!', err);
    });
}


function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height) // the 0, 0 are the coordinates for starting at the top left hand of the video
  }, 16);
}

getVideo();

