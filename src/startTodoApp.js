import {defaultCardList, newCard, addCard} from './cardManager.js';
import { compareAsc, format } from 'date-fns'



export default function startTodoApp() {
    const body = document.querySelector('body');

    body.appendChild(makeHeader());
    body.appendChild(makeFlexContainer());
    body.appendChild(makeOverlay());
    body.appendChild(makeFooter());

    const main = document.querySelector('.main');
    main.appendChild(makeHome());
    // main.appendChild(makeCard({title: 'clean room', dueDate: '19 nov', description : 'room cleaning bla bla bla i have to', priority:'high', check: false}));
    // main.appendChild(makeCard({title: 'clean room', dueDate: '19 nov', priority:'medium', check: true}));
    // main.appendChild(makeCard({title: 'clean room', dueDate: '19 nov', priority:'low', check: true}));
    refreshCards();

    body.appendChild(makeForm());

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

    const addButton = document.createElement('button');
    addButton.classList.add('btn-add');
    addButton.textContent = '+';
    addButton.addEventListener('click', () => openModal());
    main.appendChild(addButton);

    return main;
}

function openModal() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('#overlay');
    overlay.classList.add('active');
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('#overlay');
    overlay.classList.remove('active');
    modal.classList.remove('active');
}


function createListElement(text) {
    const li = document.createElement('li');
    li.textContent = text;
    return li;
}

function makeOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.addEventListener('click', () => closeModal());

    return overlay
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


function makeHome() {
    const title = document.createElement('h1');
    title.classList.add('main-title');
    title.textContent = 'Home';


    return title;
}

function refreshCards() {
    const main = document.querySelector('.main');
    defaultCardList.forEach(card => {
        main.appendChild(makeCard(card));
    });
}


function makeCard(Card) {
    console.log(Card);
    const card = document.createElement('div');
    card.classList.add('card');

    const t = document.createElement('h2');
    t.classList.add('card-title');
    t.textContent = Card.title;
    const c = document.createElement('input');
    c.type = 'checkbox';
    c.name = 'check';
    c.classList.add('checkbox');
    Card.check === true ? c.checked = true : c.checked = false;

    const divCheckTitle = document.createElement('div');
    divCheckTitle.appendChild(c);
    divCheckTitle.appendChild(t);

    const d = document.createElement('h2');
    d.classList.add('card-date');
    console.log(format (new Date (Date.parse(Card.dueDate)), 'd MMMM'));
    d.textContent = format (new Date (Date.parse(Card.dueDate)), 'd MMMM');

    const dsc = document.createElement('p');
    dsc.classList.add('card-description');
    dsc.textContent = Card.description;

    switch (Card.priority) {
        case 'high':
            card.classList.add('red-border');
            break
        case 'medium':
            card.classList.add('yellow-border');
            break;
        case 'low':
            card.classList.add('green-border');
            break;


        default:
            break;
    }

    card.appendChild(divCheckTitle);
    card.appendChild(d);


    return card;
}

function makeForm() {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const form = document.createElement('form');
    form.classList.add('form-container');

    const title = document.createElement('h1');
    title.textContent = 'Add Task';

    const closebtn = document.createElement('button');
    closebtn.classList.add('close-btn');
    closebtn.textContent = 'x';
    closebtn.addEventListener('click',function(event){
        event.preventDefault();
        closeModal();
    });

    const modalheader = document.createElement('div');
    modalheader.appendChild(title);
    modalheader.appendChild(closebtn);
    modalheader.classList.add('modal-header')


    form.appendChild(modalheader);
    form.appendChild(addFormInput('text','task-name', 'Task Name'));
    form.appendChild(addFormInput('text','task-description', 'Description'));
    form.appendChild(addFormInput('date','date', 'Date'));

    const s = document.createElement("input");
    s.setAttribute("type", "submit");
    s.setAttribute("value", "Submit");
    s.addEventListener('click', function(event) {
        event.preventDefault();
        const card = addCard(defaultCardList, newCard(form[1].value, form[2].value, form[3].value, 'high', false));
        refreshCards(card);
        console.log(defaultCardList);
        closeModal();
    })
    form.appendChild(s);

    modal.appendChild(form);

    return modal;
}


function addFormInput(type, name, placeholder) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.setAttribute('placeholder', placeholder);

    return input;
}