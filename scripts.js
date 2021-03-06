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
    ctx.drawImage(video, 0, 0, width, height); // the 0, 0 are the coordinates for starting at the top left hand of the video
    //take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = rgbRange(pixels);
    // mess with the pixels (in this case, the rgb values)
    // pixels = rgbSplit(pixels);
    //ghosting effect (slow motion 20% speed)
    // ctx.globalAlpha = 0.2;
    // put the pixels back after messing with them
    ctx.putImageData(pixels, 0, 0);

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
  // link.textContent = 'Download Image';
  
  // Instead of having the text content, you can make the source the image and have the image show up along with a caption for the photo
  link.innerHTML = `<img src="${data}" alt="Webcam-app Photo" />`;
  strip.insertBefore(link, strip.firstChild);
}


// function that messes with the rgb values and emphasizes red
function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
     pixels.data[i] = pixels.data[i] + 100; // red from rgb
     pixels.data[i + 1] = pixels.data[i + 1] - 50; // green from rgb
     pixels.data [i + 2] = pixels.data [i + 2] * 0.5; // blue from rgb
  }
  return pixels;
}

// function that messes with the rgb values and emphasizes green
function greenEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i] = pixels.data[i] - 25; 
    pixels.data[i + 1] = pixels.data[i + 1] + 40; 
    pixels.data [i + 2] = pixels.data [i + 2] * 0.5; 
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i - 300] = pixels.data[i]; 
    pixels.data[i + 400] = pixels.data[i + 1]; 
    pixels.data [i - 450] = pixels.data [i + 2]; 
  }
  return pixels;  
}

function rgbRange(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for(i = 0; i < pixels.data.length; i+=4) {
    red = pixels.data[i]; 
    green = pixels.data[i + 1]; 
    blue = pixels.data [i + 2]; 
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      //take it out!
      pixels.data[i + 3] = 0;
    }
  }
  return pixels;  
}

getVideo();

video.addEventListener('canplay', paintToCanvas);

