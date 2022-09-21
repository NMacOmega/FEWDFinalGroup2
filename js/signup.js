//Class Definitions for Key Elements
const pageClasses = [
  "signup__card-1",
  "signup__card-2",
  "signup__card-3",
  "signup__card-final",
];

const pageTitleClass = "signup__title-heading";
const pageTitleRemoveClass = "signup__title-heading--remove";

const shiftNextClass = "--off-right";
const shiftPrevClass = "--off-left";

const nextBtnClass = "signup__form-next";
const prevBtnClass = "signup__form-prev";

const btnHiddenClass = "--button-hidden";

/*Classes for final card*/

const titleClass = "signup__card-welcome";
const lineClass = "signup__card-line";
const checkClass = "signup__card-check";
const animateLineClass = "signup__card-line--active";
const animateCheckClass = "signup__card-check--active";

/*Grab signup pages*/
const pages = pageClasses.reduce(
  (acc, pageClass) => [...acc, document.getElementsByClassName(pageClass)[0]],
  []
);

let pageIndex = 0; //Keep track of where we are in form
const maxPages = pages.length; //Number of pages in form

/*Grab Progression buttons*/
/*grab input buttons*/
pages.map((page) => {
  if (page.className.includes("final")) return;

  page.addEventListener("submit", (e) => {
    processNextPrev(e, "next");
  });

  let thisPrevBtn = page.getElementsByClassName(prevBtnClass)[0];

  if (thisPrevBtn)
    thisPrevBtn.addEventListener("click", (e) => {
      processNextPrev(e, "prev");
    });
});

function processNextPrev(e, direction) {
  e.preventDefault();

  switch (direction) {
    case "prev":
      if (pageIndex <= 0) return;
      pages[pageIndex].classList.add(shiftNextClass);
      pages[pageIndex - 1].classList.remove(shiftPrevClass);
      pageIndex--;
      return;

    case "next":
      if (pageIndex >= maxPages - 1) return;
      pages[pageIndex].classList.add(shiftPrevClass);
      pages[pageIndex + 1].classList.remove(shiftNextClass);
      pageIndex++;
      if (pageIndex == maxPages - 1) onFinish();
      return;
  }
}

function onFinish() {
  const firstName = document.getElementsByName("fname")[0].value;
  document.getElementsByClassName(
    titleClass
  )[0].textContent = `Welcome to the club,\n ${firstName}!`;

  document
    .getElementsByClassName(pageTitleClass)[0]
    .classList.add(pageTitleRemoveClass);

  document.getElementsByClassName(lineClass)[0].classList.add(animateLineClass);
  document
    .getElementsByClassName(checkClass)[0]
    .classList.add(animateCheckClass);
}
