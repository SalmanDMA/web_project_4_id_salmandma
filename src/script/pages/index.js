import { forms, FormValidator, data } from '../components/formValidation.js';
import '../../styles/pages/index.css';
import { items, sectionProfile, inputName, inputJob, valueInputName, valueInputJob, cardContainer, imagePopupSelector, editProfilePopupSelector, addNewCardPopupSelector, buttonEditProfile, buttonNewCard } from '../utils/constants.js';
import Section from '../components/section.js';
import { Card } from '../components/card.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/userInfo.js';

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

// render cards list
const cardList = new Section(
 {
  items,
  renderer: (item) => {
   const cardItem = new Card(item.name, item.link, handleCardClick);
   const cardElement = cardItem.generateCard();

   cardList.addItem(cardElement);
  },
 },
 cardContainer
);

cardList.renderer();

// render popup with image
const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

function handleCardClick(items) {
 popupImage.open(items);
}

const profileInfo = new UserInfo(valueInputName, valueInputJob);

const editProfileSubmitHandler = (data) => {
 profileInfo.setUserInfo(data);
 showAlertBox(`Selamat perubahan data ${data.inputName} dan ${data.inputJob} telah berhasil !!!`);
 editProfilePopup.close();
};

// create new cards
function makeNewCard(data) {
 const cardItem = new Card(data.inputJudul, data.inputTautanGambar, handleCardClick);
 const cardElement = cardItem.generateCard();

 return cardElement;
}

const addCardSubmitHandler = (data) => {
 cardList.addItem(makeNewCard(data), true);
 showAlertBox(`Selamat data berhasil di tambahkan dengan judul ${data.inputJudul}`);
 addNewCardPopup.close();
};

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, editProfileSubmitHandler);

const addNewCardPopup = new PopupWithForm(addNewCardPopupSelector, addCardSubmitHandler);

sectionProfile.addEventListener('click', (event) => {
 if (event.target.classList.contains('profile__edit')) {
  const profileInput = profileInfo.getUserInfo();
  inputName.value = profileInput.name;
  inputJob.value = profileInput.job;
  buttonEditProfile.classList.add('form__button_inactive');
  editProfilePopup.open();
 } else if (event.target.classList.contains('profile__add')) {
  buttonNewCard.classList.add('form__button_inactive');
  addNewCardPopup.open();
 } else {
  return;
 }
});
editProfilePopup.setEventListeners();
addNewCardPopup.setEventListeners();

forms.forEach((form) => {
 const validator = new FormValidator(data, form);

 validator.enableValidation();
});
