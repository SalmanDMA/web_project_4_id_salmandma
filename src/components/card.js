class Card {
 constructor(card, userId, handleCardClick, handleLikeClick, handleDeleteClik) {
  this._card = card;
  this._name = this._card.name;
  this._link = this._card.link;
  this._likes = this._card.likes;
  this._id = this._card._id;
  this._ownerId = this._card.owner._id;
  this._userId = userId;
  this._handleCardClick = handleCardClick;
  this._handleLikeClick = handleLikeClick;
  this._handleDeleteClik = handleDeleteClik;
  this._cardTemplate = document.querySelector('#cardTemplate').content.querySelector('.card__item');
  this._cardElement = this._cardTemplate.cloneNode(true);
  this._cardLikes = this._cardElement.querySelector('.card__likes-text');
 }

 generateCard() {
  this._setEventListeners();

  this._cardElement.querySelector('.card__image').setAttribute('src', this._link);
  this._cardElement.querySelector('.card__image').setAttribute('alt', this._name);

  this._cardElement.querySelector('.card__title').textContent = this._name;
  this._cardElement.querySelector('.card__title').setAttribute('title', this._name);

  this._cardElement.querySelector('.card__likes-text').textContent = this._likes.length;

  if (this._isLiked()) {
   this._cardElement.querySelector('.card__icon').classList.toggle('toggle');
  }

  this._deleteButton = this._cardElement.querySelector('.card__icon-delete');

  if (!(this._ownerId === this._userId)) {
   this._deleteButton.classList.add('card__icon-delete_hidden');
  }

  return this._cardElement;
 }

 _handleLikeCard() {
  const isLiked = this._isLiked();
  this._cardElement.querySelector('.card__icon').classList.toggle('toggle');
  this._handleLikeClick(this._card, this._id, isLiked);
  if (!isLiked) {
   this._likes.push({
    _id: this._userId,
    name: this._card.owner.name,
   });
   console.log(this._likes);
   this._cardLikes.textContent = this._likes.length;
  } else {
   const index = this._likes.findIndex((like) => like._id === this._userId);
   if (index !== -1) {
    this._likes.splice(index, 1);
    console.log(this._likes);
    this._cardLikes.textContent = this._likes.length;
   }
  }
 }

 _isLiked() {
  for (let i = 0; i < this._likes.length; i++) {
   if (this._likes[i]) {
    if (this._likes[i]._id === this._userId) {
     return true;
    }
   }
  }
  return false;
 }

 _setEventListeners() {
  this._cardElement.addEventListener('click', (event) => {
   if (event.target.classList.contains('card__icon-delete')) {
    this._handleDeleteClik(this._cardElement, this._id, this._name);
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
