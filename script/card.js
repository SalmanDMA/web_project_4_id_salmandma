import { showElement } from './index.js';

const items = [
 {
  name: 'Lembah Yosemite',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
 },
 {
  name: 'Danau Louise',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
 },
 {
  name: 'Pegunungan Gundul',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg',
 },
 {
  name: 'Gunung Latemar',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg',
 },
 {
  name: 'Taman Nasional Vanoise',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg',
 },
 {
  name: 'Lago di Braies',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg',
 },
];

class Card {
 constructor(name, link) {
  this._name = name;
  this._link = link;
  this._inputTitle = document.querySelector('input[name="inputJudul"]');
  this._inputUrl = document.querySelector('input[name="inputTautanGambar"]');
  this._card = document.querySelector('.card');
 }

 addInitialCards() {
  const result = {
   name: this._inputTitle.value,
   link: this._inputUrl.value,
  };
  items.unshift(result);
 }

 _getTemplateCard() {
  const cardTemplate = document.querySelector('#cardTemplate').content.querySelector('.card__item').cloneNode(true);
  return cardTemplate;
 }

 generateCard() {
  this._cardElement = this._getTemplateCard();
  this._setEventListeners();

  this._cardElement.querySelector('.card__image').setAttribute('src', this._link);
  this._cardElement.querySelector('.card__image').setAttribute('alt', this._name);

  this._cardElement.querySelector('.card__title').textContent = this._name;
  this._cardElement.querySelector('.card__title').setAttribute('title', this._name);

  return this._cardElement;
 }

 _handleDeleteCard() {
  this._cardElement.remove();
 }

 _handleLikeCard() {
  this._cardElement.querySelector('.card__icon').classList.toggle('toggle');
 }

 _setEventListeners() {
  this._cardElement.addEventListener('click', (event) => {
   if (event.target.classList.contains('card__icon-delete')) {
    this._handleDeleteCard();
   } else if (event.target.classList.contains('card__icon')) {
    this._handleLikeCard();
   } else if (event.target.classList.contains('card__image')) {
    showElement('popUp');
   } else {
    return;
   }
  });
 }

 _filteredCard() {
  const newInputCard = this._inputTitle.value;
  const filterCard = items.filter((item) => item.name === newInputCard);

  const newCardContainer = document.createElement('div');
  newCardContainer.classList.add('card__item');

  const newCardImage = document.createElement('img');
  newCardImage.classList.add('card__image');
  newCardImage.setAttribute('src', filterCard[0].link);
  newCardImage.setAttribute('alt', filterCard[0].name);

  const newCardBtn = document.createElement('button');
  newCardBtn.classList.add('card__icon-delete', 'hover-icon');

  const newCardMainText = document.createElement('div');
  newCardMainText.classList.add('card__main-text');

  const newCardTitle = document.createElement('h3');
  newCardTitle.classList.add('card__title');
  newCardTitle.setAttribute('title', filterCard[0].name);
  newCardTitle.textContent = filterCard[0].name;

  const newCardBtnHeart = document.createElement('button');
  newCardBtnHeart.classList.add('card__icon', 'hover-icon');

  newCardMainText.append(newCardTitle, newCardBtnHeart);

  newCardContainer.append(newCardImage, newCardBtn, newCardMainText);

  const referenceNode = this._card.firstChild;

  this._card.insertBefore(newCardContainer, referenceNode);

  const newCardElements = {
   btnHeart: newCardBtnHeart,
   image: newCardImage,
   btnDelete: newCardBtn,
  };

  return newCardElements;
 }

 setEventListenersFilterCard() {
  const newCardElements = this._filteredCard();

  newCardElements.btnHeart.addEventListener('click', () => {
   newCardElements.btnHeart.classList.toggle('toggle');
  });

  newCardElements.image.addEventListener('click', () => {
   showElement('popUp');
  });

  newCardElements.btnDelete.addEventListener('click', () => {
   newCardElements.btnDelete.parentElement.remove();
  });
 }
}

export { items, Card };
