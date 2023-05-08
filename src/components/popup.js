export default class Popup {
 constructor(popupSelector) {
  this._popup = popupSelector;
  this._overlay = document.querySelector('.overlay');
 }

 open() {
  this._overlay.classList.add('block');
  this._popup.classList.add('block');
 }

 close() {
  this._popup.classList.remove('block');
  this._popup.classList.add('close');
  this._overlay.classList.remove('block');
  this._overlay.classList.add('close');

  setTimeout(() => {
   this._popup.classList.remove('close');
   this._overlay.classList.remove('close');
  }, 300);
 }

 _handleEscClose(event) {
  const keyCode = 27;
  if (event.keyCode === keyCode) {
   this.close();
  }
 }

 setEventListeners() {
  this._popup.addEventListener('click', (event) => {
   if (event.target.classList.contains('pop-up__icon') || event.target.classList.contains('form__icon') || event.target.classList.contains('pop-up__icon-confirm')) {
    this.close();
   }
  });

  document.addEventListener('keydown', (event) => {
   this._handleEscClose(event);
  });

  this._overlay.addEventListener('click', (event) => {
   if (event.target.classList.contains('overlay')) {
    this.close();
   }
  });
 }
}
