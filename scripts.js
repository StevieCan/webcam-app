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
      
      //opens up the video and plays at the top right of the page by updating. Without this line of code, you may see the video player when you hover over the video player but it won't update in real time. 
      video.play();
    
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

function takePhoto() {
  //played the sound
  snap.currentTime = 0;
  snap.play();

  //take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');

  // create a link and an image to put it into our strip
  const link = document.createElement('a');
  // set link equal to data
  link.href = data;
  link.setAttribute('download', 'Webcam-app Photo');
  // link text content
  link.textContent = 'Download Image';
  // Instead of having the text content, you can make the source the image and have the image show up along with a caption for the photo
  link.innerHTML = `<img src="${data}" alt="Webcam-app Photo" />`;
  strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener('canplay', paintToCanvas);

