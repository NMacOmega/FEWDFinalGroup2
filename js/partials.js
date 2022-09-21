let navPartial = `
    <ul class= 'nav__list'>
        <li class = 'nav__item--logo'>
            <a class = 'nav__link--logo' href = './index.html'><span class="nav__logo">Group 2</span></a>
        </li>
        <li class = 'nav__item'>
            <a class = 'nav__link' href = './mission.html'><span class="nav__text">Featured Artists</span></a>
        </li>
        <li class = 'nav__item'>
            <a class = 'nav__link' href = './questionnaire.html'><span class="nav__text">Questionnaire</span></a>
        </li>
        <li class = 'nav__item'>
            <a class = 'nav__link' href = './prompt.html'><span class="nav__text">Prompt</span></a>
        </li>   
    </ul>`;
let footerPartial = `
<ul class= 'footer__list'>
    <li class = 'footer__item'>
        <a class = 'footer__link' href = './index.html'><span class="footer__text">Home</span></a>
    </li>
    <li class = 'footer__item'>
        <a class = 'footer__link' href = './mission.html'><span class="footer__text">Featured Artists</span></a>
    </li>
    <li class = 'footer__item'>
        <a class = 'footer__link' href = './questionnaire.html'><span class="footer__text">Questionnaire</span></a>
    </li>
    <li class = 'footer__item'>
        <a class = 'footer__link' href = './prompt.html'><span class="footer__text">Prompt</span></a>
    </li>   
</ul>
<p class="footer__copyright">&copy; 2022 Group 2 Studios</p>
`;

let headerTemplate = Handlebars.compile(navPartial);
let footerTemplate = Handlebars.compile(footerPartial);

let nav = document.createElement("nav");
let footer = document.createElement("footer");

nav.innerHTML = navPartial;
nav.classList.add("nav");
footer.innerHTML = footerPartial;
footer.classList.add("footer");

document.querySelector("#nav").replaceWith(nav);
document.querySelector("#footer").replaceWith(footer);
