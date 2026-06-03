import './styles/style.css';

// Global Variables
let mediaStream = null;

// DOM Elements
const videoElement = document.getElementById('video');
const button = document.getElementById('button');

async function startPictureInPicture() {
  try {
    await videoElement.requestPictureInPicture();
  } catch (error) {
    console.log(error);
  }
}

function clearMediaStream() {
  videoElement.srcObject = null;

  mediaStream?.getTracks().forEach((track) => track.stop());
  mediaStream = null;

  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  }
}

async function selectMediaStream() {
  clearMediaStream();

  const controller = new CaptureController();
  const displayMediaOptions = {
    video: {
      displaySurface: 'browser',
      frameRate: { ideal: 60 },
    },
    audio: {
      noiseSuppression: true,
    },
    preferCurrentTab: false,
    selfBrowserSurface: 'exclude',
    systemAudio: 'include',
    surfaceSwitching: 'include',
    monitorTypeSurfaces: 'include',
    controller,
  };

  // Don't change focus to captured screen
  controller.setFocusBehavior('no-focus-change');

  try {
    // Prompt capture screen
    mediaStream =
      await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

    mediaStream.getVideoTracks()[0].addEventListener('ended', clearMediaStream);

    videoElement.srcObject = mediaStream;
  } catch (error) {
    console.log(error);
  }
}

// Event listener funtions
videoElement.addEventListener('loadedmetadata', startPictureInPicture);
videoElement.addEventListener('leavepictureinpicture', clearMediaStream);
button.addEventListener('click', selectMediaStream);
