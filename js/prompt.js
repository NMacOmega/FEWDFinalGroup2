console.log("hello there");
console.log(imageSources);
console.log(writingSources);
/* Grab page elements */

/* Elements for Art Form */
let artContainer = document.getElementById("artContainer");
let artInputTextarea = document.getElementById("artInputTextarea");
let artLoaderContainer = document.getElementById("artLoaderContainer");
let artResultTargetText = document.getElementById("artResultTargetText");
let artResultTargetImg = document.getElementById("artResultImg");
let artResultTargetTitle = document.getElementById("artResultTitle");
let artResultTargetArtist = document.getElementById("artResultArtist");
let artResultTargetDesc = document.getElementById("artResultDesc");
let artResultTargetDownload = document.getElementById("artResultDownload");

/* Elements for Writing Form */
let writeContainer = document.getElementById("writeContainer");
let writeGenerateButton = document.getElementById("writeGenerateButton");
let writeInputFile = document.getElementById("writeInputFile");
let writeLoaderContainer = document.getElementById("writeLoaderContainer");
let writeResultTargetText = document.getElementById("writeResultTargetText");
let writeResultTargetCitation = document.getElementById(
  "writeResultTargetCitation"
);

let writeResultCopySpan = document.getElementById("writeCopy");
let writeResultCopySymbol = document.getElementById("writeCopySymbol");
let writeResultCopyText = document.getElementById("writeCopyText");

/*Elements for Artist Highlight*/
let artArtistHighlightContainer = document.getElementById("artArtistHighlight");
let artArtistHighlightTagline = document.getElementById("artArtistTagline");
let artArtistHighlightName = document.getElementById("artArtistName");
let artArtistHighlightImg = document.getElementById("artArtistHighImg");
let writeArtistHighlightContainer = document.getElementById(
  "writeArtistHighlight"
);
let writeArtistHighlightTagline = document.getElementById("writeArtistTagline");
let writeArtistHighlightName = document.getElementById("writeArtistName");
let writeArtistHighlightImg = document.getElementById("writeArtistHighImg");

/* Event listeners*/
artGenerateButton.addEventListener("click", generateArt);
writeGenerateButton.addEventListener("click", generateWriting);
writeResultCopySpan.addEventListener("click", copyToClipboard);

/*Startup actions for a unique experience*/
artInputTextarea.placeholder = "Hello There";

/* Utility functions to show elements and copy text*/
function addClass(className, elems) {
  if (className === undefined) return;

  for (const elem of elems) {
    elem.classList.add(className);
  }
}

function remClass(className, elems) {
  if (className === undefined) return;
  for (const elem of elems) {
    elem.classList.remove(className);
  }
}

function copyToClipboard(e) {
  e.preventDefault();
  var copyResult =
    writeResultTargetText.textContent +
    "\n\n" +
    writeResultTargetCitation.textContent;

  navigator.clipboard.writeText(copyResult);

  addClass("--hidden", [writeResultCopySymbol]);
  remClass("--hidden", [writeResultCopySpan, writeResultCopyText]);
}

/* Function to operate form to get art from text input*/
/*--------------------------------------------*/
function generateArt(e) {
  e.preventDefault();
  /* Form Validations */
  console.log(artInputTextarea.value);
  remClass("artist__highlight--active", [artArtistHighlightContainer]);
  addClass("--round-corners-all", [artContainer]);
  remClass("prompt-art__form-textarea--alert", [artInputTextarea]);

  if (artInputTextarea.value.length < 1) {
    artResultTargetText.textContent =
      "We need your written piece before we can connect you to our artwork!";

    addClass("prompt-art__form-textarea--alert", [artInputTextarea]);
    addClass("--hidden", [
      artResultTargetImg,
      artResultTargetTitle,
      artResultTargetArtist,
      artResultTargetDesc,
      artResultTargetDownload,
      artLoaderContainer,
    ]);

    remClass("--hidden", [artResultTargetText]);
    return;
  }

  addClass("--hidden", [
    artResultTargetText,
    artResultTargetImg,
    artResultTargetTitle,
    artResultTargetArtist,
    artResultTargetDesc,
    artResultTargetDownload,
  ]);
  remClass("--hidden", [artLoaderContainer]);

  var art = getArtFromWritingSample(artInputTextarea.value);
  console.log(art);
  if (art && art.link) {
    artResultTargetImg.src = art.link;
    artResultTargetImg.alt = art.alt;
    artResultTargetTitle.textContent = art.title;
    artResultTargetArtist.textContent = art.artist;
    artResultTargetDesc.textContent = art.description;
    artResultTargetText.textContent = "Here is your image!";
    artResultTargetDownload.href = art.link;
    artResultTargetDownload.download = art.downloadName;

    setTimeout(() => {
      remClass("--round-corners-all", [artContainer]);
      addClass("--hidden", [artLoaderContainer]);
      remClass("--hidden", [
        artResultTargetText,
        artResultTargetImg,
        artResultTargetTitle,
        artResultTargetArtist,
        artResultTargetDesc,
        artResultTargetDownload,
      ]);
    }, 2000);

    setTimeout(() => {
      addClass("artist__highlight--active", [artArtistHighlightContainer]);
    }, 4000);
    return;
  }

  /* Failure Case */
  artResultTargetText.textContent =
    "Sorry, but your sample did not match any of our current pieces. Try fleshing it out.";
  console.log("Failure");
  remClass("--hidden", [artResultTargetText]);
  addClass("--hidden", [artLoaderContainer]);
}

/* Function to operate form to get literature from image input*/
/*--------------------------------------------*/
function generateWriting(e) {
  e.preventDefault();
  let filePath = writeInputFile.value;
  remClass("artist__highlight--active", [writeArtistHighlightContainer]);
  addClass("--round-corners-all", [writeContainer]);
  addClass("--hidden", [
    writeResultTargetText,
    writeResultTargetCitation,
    writeResultCopySpan,
  ]);
  remClass("--hidden", [writeLoaderContainer]);
  /* Form Validations */
  if (
    filePath.length < 1 ||
    (!filePath.includes(".jpg") &&
      !filePath.includes(".jpeg") &&
      !filePath.includes(".png") &&
      !filePath.includes(".gif") &&
      !filePath.includes(".jfif"))
  ) {
    writeResultTargetText.textContent =
      "Please only upload a .jpg, .png, .gif, or .jfif file";
    remClass("artist__highlight--active", [artArtistHighlightContainer]);
    addClass("--hidden", [writeResultTargetCitation, writeLoaderContainer]);
    remClass("--hidden", [writeResultTargetText]);
    return;
  }

  /*Create Writing Magic */
  var literature = getWritingFromArtSample(writeInputFile.value);
  if (literature && literature.text) {
    writeResultTargetText.textContent = literature.text;
    writeResultTargetCitation.textContent = literature.citation;

    setTimeout(() => {
      remClass("--hidden", [
        writeResultTargetText,
        writeResultTargetCitation,
        writeResultCopySpan,
        writeResultCopySymbol,
      ]);
      remClass("--round-corners-all", [writeContainer]);
      addClass("--hidden", [writeResultCopyText, writeLoaderContainer]);
    }, 3000);

    setTimeout(() => {
      addClass("artist__highlight--active", [writeArtistHighlightContainer]);
    }, 5000);
    return;
  }
  writeResultTargetText.textContent =
    "Sorry, None of our works complement the image you uploaded. Try another...";

  addClass("--hidden", [writeResultTargetCitation, writeLoaderContainer]);
  remClass("--hidden", [writeResultTargetText]);
}

/*Background functions to convert input into images and text*/

function getArtFromWritingSample(textInput) {
  console.log(textInput);
  var result = {
    link: "./public/img/prompt-results/four.jpg",
    alt: "Lovely image",
    artist: "Amy Musgraves",
    title: "Beautiful picture",
    description: "Pure Beauty",
    downloadName: "Name_of_file",
  };
  return result;
}

function getWritingFromArtSample(filestring) {
  console.log(filestring);
  var result = {
    text: "Hello there",
    citation: "Obi-Wan Kenobi, Star Wars Revenge of the Sith",
  };

  return result;
}
