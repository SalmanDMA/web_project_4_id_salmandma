import Popup from './popup';

export default class PopUpImage extends Popup {
 constructor(popupSelector) {
  super(popupSelector);
  this._popupImage = document.querySelector('.pop-up__image');
  this._popupCaption = document.querySelector('.pop-up__title');
 }

 open(data) {
  this._popupImage.setAttribute('src', data.link);
  this._popupImage.setAttribute('alt', data.name);
  this._popupCaption.textContent = data.name;
  super.open();
 }
}
