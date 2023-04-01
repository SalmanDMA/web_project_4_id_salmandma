import { items, Card } from './card.js';
import { forms, FormValidator, data } from './formValidation.js';

const overlay = document.querySelector('.overlay');
const sectionProfile = document.querySelector('.profile');
const btnCloseForm = document.querySelectorAll('.form__icon');
const btnSaveForm = document.querySelector('.form__button-save');
const formEdit = document.querySelector('.form-edit');
const formAdd = document.querySelector('.form-add');
const btnCreateForm = document.querySelector('.form__button-create');
const inputName = document.querySelector('.form__name');
const inputJob = document.querySelector('.form__job');
const valueInputName = document.querySelector('.profile__title');
const valueInputJob = document.querySelector('.profile__text');
const popup = document.querySelector('.pop-up');
const inputTitle = document.querySelector('input[name="inputJudul"]');
const cardContainer = document.querySelector('.card');

function showElement(element) {
 if (element === 'formEdit') {
  overlay.classList.add('block');
  formEdit.classList.add('block');
  inputName.value = valueInputName.textContent;
  inputJob.value = valueInputJob.textContent;
 } else if (element === 'popUp') {
  const popUpImage = document.querySelector('.pop-up__image');
  const srcImg = event.target.src;
  const altImg = event.target.alt;
  popUpImage.setAttribute('src', srcImg);
  popUpImage.setAttribute('alt', altImg);

  const popUpTitle = document.querySelector('.pop-up__title');
  popUpTitle.textContent = altImg;

  overlay.classList.add('block');
  popup.classList.add('block');

  document.addEventListener('keydown', keyDownListener);
 } else {
  overlay.classList.add('block');
  formAdd.classList.add('block');
 }
}

function closeElement(element) {
 if (element === 'form') {
  overlay.classList.remove('block');

  formEdit.classList.add('close');

  formAdd.classList.add('close');

  popup.classList.add('close');

  setTimeout(() => {
   formEdit.classList.remove('close');
   formEdit.classList.remove('block');

   formAdd.classList.remove('close');
   formAdd.classList.remove('block');

   popup.classList.remove('close');
   popup.classList.remove('block');
  }, 300);
 } else {
  overlay.classList.remove('block');
  popup.classList.add('close');

  document.removeEventListener('keydown', keyDownListener);

  setTimeout(() => {
   popup.classList.remove('close');
   popup.classList.remove('block');
  }, 300);
 }
}

function saveForm() {
 valueInputName.textContent = inputName.value;
 valueInputJob.textContent = inputJob.value;

 closeElement('form');
}

function showAlertBox(textContent) {
 const sectionProfile = document.querySelector('.profile');
 const alertContainer = document.createElement('section');
 alertContainer.classList.add('alert');
 const alertText = document.createElement('h3');
 alertText.classList.add('alert__text');
 alertText.textContent = textContent;

 alertContainer.append(alertText);
 sectionProfile.before(alertContainer);

 setTimeout(() => {
  alertContainer.classList.add('close');
 }, 3000);
 setTimeout(() => {
  alertContainer.remove();
 }, 4000);
}

const keyDownListener = (event) => {
 eventKeyCode(event);
};

function eventKeyCode(event) {
 const keyCode = 27;
 if (event.keyCode === keyCode) {
  closeElement();
 }
}

// from card.js
items.forEach((item) => {
 const cardItem = new Card(item.name, item.link);
 const cardElement = cardItem.generateCard();
 if (item.name && item.link) {
  document.querySelector('.card').append(cardElement);
 }
});

// from formValidation.js
forms.forEach((form) => {
 const validator = new FormValidator(data, form);

 validator.enableValidation();
});

export { overlay, popup, sectionProfile, btnCloseForm, btnSaveForm, btnCreateForm, showElement, showAlertBox, closeElement, saveForm, valueInputJob, valueInputName, inputTitle, cardContainer };
