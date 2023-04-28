import Popup from './popup';

export default class PopupWithForm extends Popup {
 constructor(popupSelector, callback) {
  super(popupSelector);
  this._callback = callback;
  this._formSelector = popupSelector.querySelector('form');
 }

 _getInputValues() {
  const formData = new FormData(this._formSelector);
  const inputValues = {};
  for (const [key, value] of formData.entries()) {
   inputValues[key] = value;
  }
  return inputValues;
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
