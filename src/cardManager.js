import { Card } from "./makeCard";

const sampleCard = newCard('Chore', 'Chorist', '2020-05-30', 'high', false);
const defaultCardList = [sampleCard];

function newCard(title, description, dueDate, priority, check) {
    return new Card(title, description, dueDate, priority, check);
}

function addCard(cardList, card) {
    cardList.push(card);
}

function removeCard(cardList, card) {
    cardList.push(card);
}

export {defaultCardList, newCard, addCard};