import Popup from './popup';

class PopupWithConfirm extends Popup {
 constructor(popupSelector, callback) {
  super(popupSelector);
  this._callback = callback;
  this._form = popupSelector.querySelector('form');
 }

 open(cardElement, cardId, cardName) {
  super.open();
  this._cardElemet = cardElement;
  this._id = cardId;
  this._cardName = cardName;
 }

 setEventListeners() {
  super.setEventListeners();
  this._form.addEventListener('submit', (event) => {
   event.preventDefault();
   this._callback(this._cardElemet, this._id, this._cardName);
  });
 }

 close() {
  super.close();
 }
}

export default PopupWithConfirm;
