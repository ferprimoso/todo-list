export default function startTodoApp() {
    const body = document.querySelector('body');



    body.appendChild(makeHeader());
    body.appendChild(makeFlexContainer());
    body.appendChild(makeFooter());
}

function makeHeader() {
    const header = document.createElement('header');
    header.classList.add('header')
    header.textContent = 'todo'
    return header;
}

function makeFlexContainer() {
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-container')

    flexContainer.appendChild(makeSideBar());
    flexContainer.appendChild(makeMain());

    return flexContainer;
}

function makeSideBar() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar')

    const nav = document.createElement('ul');
    nav.appendChild(createListElement('home'));
    nav.appendChild(createListElement('today'));
    nav.appendChild(createListElement('projects'));
    nav.classList.add('nav-list');

    sidebar.appendChild(nav);

    return sidebar;
}

function makeMain() {
    const main = document.createElement('div');
    main.classList.add('main')

    return main;
}


function createListElement(text) {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
}



function makeFooter() {
    const footer = document.createElement('div');
    footer.classList.add('footer')

    const p = document.createElement('p');
    p.classList.add('footer-text');
    p.textContent = 'made by github.com/ferprimoso'

    footer.appendChild(p);

    return footer;
}