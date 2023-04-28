class Card {
 constructor(name, link, handleCardClick) {
  this._name = name;
  this._link = link;
  this._handleCardClick = handleCardClick;
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
    this._handleCardClick({ name: this._name, link: this._link });
   } else {
    return;
   }
  });
 }
}

export { Card };
