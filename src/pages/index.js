import FormValidator from '../components/formValidation.js';
import './index.css';
import { items, sectionProfile, inputName, inputJob, valueInputName, valueInputJob, cardContainer, imagePopupSelector, editProfilePopupSelector, addNewCardPopupSelector, buttonEditProfile, buttonNewCard, data } from '../utils/constants.js';
import Section from '../components/section.js';
import { Card } from '../components/card.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/userInfo.js';
import AlertBox from '../components/alertBox.js';

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

const alertBoxUserInfo = new AlertBox({
 sectionProfile: sectionProfile,
 alertContainer: 'section',
 alertText: 'h3',
});

const editProfileSubmitHandler = (data) => {
 profileInfo.setUserInfo(data);
 alertBoxUserInfo.generateAlertBox(`Selamat perubahan data ${data.inputName} dan ${data.inputJob} telah berhasil !!!`);
 editProfilePopup.close();
};

// create new cards
function makeNewCard(data) {
 const cardItem = new Card(data.inputJudul, data.inputTautanGambar, handleCardClick);
 const cardElement = cardItem.generateCard();

 return cardElement;
}

const alertBoxNewCard = new AlertBox({
 sectionProfile: sectionProfile,
 alertContainer: 'section',
 alertText: 'h3',
});

const addCardSubmitHandler = (data) => {
 cardList.addItem(makeNewCard(data), true);
 alertBoxNewCard.generateAlertBox(`Selamat data berhasil di tambahkan dengan judul ${data.inputJudul}`);
 addNewCardPopup.close();
};

// Alert

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

const forms = Array.from(document.querySelectorAll(data.formSelector));

forms.forEach((formElement) => {
 const validator = new FormValidator(data, formElement);

 validator.enableValidation();
});
