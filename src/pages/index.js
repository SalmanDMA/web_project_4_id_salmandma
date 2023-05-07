import FormValidator from '../components/formValidation.js';
import './index.css';
import {
 sectionProfile,
 inputName,
 inputJob,
 valueInputName,
 valueInputJob,
 profileImage,
 cardContainer,
 imagePopupSelector,
 editProfilePopupSelector,
 addNewCardPopupSelector,
 buttonEditProfile,
 buttonNewCard,
 data,
} from '../utils/constants.js';
import Section from '../components/section.js';
import { Card } from '../components/card.js';
import PopupWithImage from '../components/popupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import UserInfo from '../components/userInfo.js';
import AlertBox from '../components/alertBox.js';
import Api from '../components/api.js';

// classes
const api = new Api({
 baseUrl: 'https://around.nomoreparties.co/v1/web_idn_cohort_01',
 headers: {
  authorization: 'a55a2a11-c51d-4757-bac3-b5d796b811b7',
  'Content-Type': 'application/json',
 },
});

const profileInfo = new UserInfo(valueInputName, valueInputJob, profileImage);

const editProfilePopup = new PopupWithForm(editProfilePopupSelector, editProfileSubmitHandler);

const addNewCardPopup = new PopupWithForm(addNewCardPopupSelector, addCardSubmitHandler);

const popupImage = new PopupWithImage(imagePopupSelector);

const cardList = new Section(
 {
  items: [],
  renderer: () => {},
 },
 cardContainer
);

const alertBoxUserInfo = new AlertBox({
 sectionProfile: sectionProfile,
 alertContainer: 'section',
 alertText: 'h3',
});

const alertBoxNewCard = new AlertBox({
 sectionProfile: sectionProfile,
 alertContainer: 'section',
 alertText: 'h3',
});

// function

function editProfileSubmitHandler(data) {
 api
  .patchUserInfo(data)
  .then(() => {
   profileInfo.setUserInfo(data);
  })
  .then(() => {
   alertBoxUserInfo.generateAlertBox(`Selamat perubahan data ${data.inputName} dan ${data.inputJob} telah berhasil !!!`);
  })
  .then(() => {
   editProfilePopup.close();
  })
  .catch((err) => {
   console.log(err);
  });
}

function handleCardClick(items) {
 popupImage.open(items);
}

function handleLikeClick(card, cardId, isLiked) {
 console.log(isLiked);
 console.log(card._likes);
 api
  .updateLikeCard(cardId, isLiked)
  .then((data) => {
   console.log(data.likes);
   card._likes = data.likes;
  })
  .catch((err) => {
   console.log(err);
  });
}

function makeNewCard(data, userId) {
 const cardItem = new Card(data, userId, handleCardClick, handleLikeClick);
 const cardElement = cardItem.generateCard();

 return cardElement;
}

function addCardSubmitHandler(data) {
 api
  .postNewCard(data)
  .then((data) => {
   cardList.addItem(makeNewCard(data, data.owner._id), true);
  })
  .then(() => {
   alertBoxNewCard.generateAlertBox(`Selamat data berhasil di tambahkan dengan judul ${data.inputJudul}`);
  })
  .then(() => {
   addNewCardPopup.close();
  })
  .catch((err) => {
   console.log(err);
  });
}

// calls / listen
api
 .getInitialCardsAndUserInfo()
 .then(([initialCards, userInfo]) => {
  initialCards.forEach((initialCard) => {
   cardList.addItem(makeNewCard(initialCard, userInfo._id), false);
  });
  valueInputName.textContent = userInfo.name;
  valueInputJob.textContent = userInfo.about;
  profileImage.src = userInfo.avatar;
 })
 .catch((err) => {
  console.log(err);
 });

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
popupImage.setEventListeners();
addNewCardPopup.setEventListeners();

// forms Validation
const forms = Array.from(document.querySelectorAll(data.formSelector));

forms.forEach((formElement) => {
 const validator = new FormValidator(data, formElement);

 validator.enableValidation();
});
