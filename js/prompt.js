const randomPlaceholders = [
  "Pen down your thoughts",
  "Write your masterpiece",
  "Give us a prompt",
  "Let us complement your words",
];
const randomArtistTags = [
  "Made with love by:",
  "Produced by:",
  "A genius piece by:",
  "This is a work of:",
];

/* Set up search index tools*/
const imageSearchIndex = createSearchIndex(imageSources);
const writingSearchIndex = createSearchIndex(writingSources);

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
let artArtistHighlightImg = document.getElementById("artArtistImg");
let writeArtistHighlightContainer = document.getElementById(
  "writeArtistHighlight"
);
let writeArtistHighlightTagline = document.getElementById("writeArtistTagline");
let writeArtistHighlightName = document.getElementById("writeArtistName");
let writeArtistHighlightImg = document.getElementById("writeArtistImg");

/* Event listeners*/
artGenerateButton.addEventListener("click", generateArt);
writeGenerateButton.addEventListener("click", generateWriting);
writeResultCopySpan.addEventListener("click", copyToClipboard);
writeInputFile.addEventListener("change", generateWriting);

/*Startup actions for a unique experience*/
artInputTextarea.placeholder =
  randomPlaceholders[generateRandom(0, randomPlaceholders.length - 1)];

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

  var art = getSample({
    text: artInputTextarea.value,
    source: imageSources,
    index: imageSearchIndex,
  });
  console.log(art);

  if (art && art.link) {
    artResultTargetImg.src = art.link;
    artResultTargetImg.alt = art.description;

    artInputTextarea.placeholder =
      randomPlaceholders[generateRandom(0, randomPlaceholders.length - 1)];

    artArtistHighlightImg.src = art.artist_link;
    artArtistHighlightTagline.textContent =
      randomArtistTags[generateRandom(0, randomArtistTags.length - 1)];
    artArtistHighlightName.textContent = art.artist;
    artResultTargetTitle.textContent = art.title;
    artResultTargetArtist.textContent = art.artist;

    artResultTargetDesc.textContent = art.description;
    artResultTargetText.textContent = "Here is your image!";
    artResultTargetDownload.href = art.link;
    artResultTargetDownload.download = art.filename;

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

  var literature = getSample({
    text: writeInputFile.value,
    source: writingSources,
    index: writingSearchIndex,
  });

  if (literature && literature.text) {
    writeResultTargetText.textContent = literature.text;
    writeResultTargetCitation.textContent = literature.citation;

    writeArtistHighlightImg.src = literature.artist_link;
    writeArtistHighlightName.textContent = literature.artist;
    writeArtistHighlightTagline.textContent =
      randomArtistTags[generateRandom(0, randomArtistTags.length - 1)];

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

function createSearchIndex(source) {
  if (!source || Object.entries(source).length < 1) return {};

  let sourceIndex = {};

  Object.entries(source).map(([idx, entry]) => {
    entry.tags.map((tag) => {
      if (sourceIndex[tag]) {
        sourceIndex[tag].push(idx);
      } else {
        sourceIndex[tag] = [idx];
      }
    });
  });
  return sourceIndex;
}

function getSample(params) {
  const { text: textInput, source: sourceGroup, index: sourceIndex } = params;

  console.log(sourceGroup);
  console.log(sourceIndex);

  let sourceResults = [];

  Object.entries(sourceIndex).map(([term, sources]) => {
    console.log(term);
    console.log(sources);

    var re = new RegExp(term, "gi");
    if (textInput.match(re)) sourceResults = [...sourceResults, ...sources];
  });

  console.log(sourceResults);

  if (sourceResults.length <= 0) return null;

  let finalInd = generateRandom(0, sourceResults.length - 1);
  let finalSource = sourceResults[finalInd][0];
  console.log(finalSource);
  return sourceGroup[finalSource];
}

function generateRandom(min = 0, max = 100) {
  // find diff
  let difference = max - min;

  // generate random number
  let rand = Math.random();

  // multiply with difference
  rand = Math.floor(rand * difference);

  // add with min value
  rand = rand + min;

  return rand;
}
