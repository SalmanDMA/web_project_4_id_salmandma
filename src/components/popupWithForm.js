import Popup from './popup';

export default class PopupWithForm extends Popup {
 constructor(popupSelector, callback) {
  super(popupSelector);
  this._callback = callback;
  this._formSelector = popupSelector.querySelector('form');
  this._submitButtons = this._formSelector.querySelectorAll('.form__button');
  this._buttonValues = Array.from(this._submitButtons).map((button) => button.textContent);
 }

 _getInputValues() {
  const formData = new FormData(this._formSelector);
  const inputValues = {};
  for (const [key, value] of formData.entries()) {
   inputValues[key] = value;
  }
  return inputValues;
 }

 showPatchStatus(status) {
  this._submitButtons.forEach((button, index) => {
   if (status) {
    button.textContent = 'Menyimpan...';
   } else {
    button.textContent = this._buttonValues[index];
   }
  });

  return this;
 }

 setEventListeners() {
  super.setEventListeners();
  this._formSelector.addEventListener('submit', (event) => {
   event.preventDefault();
   this._callback(this._getInputValues());
  });
 }

 close() {
  super.close();
  this._formSelector.reset();
 }
}
