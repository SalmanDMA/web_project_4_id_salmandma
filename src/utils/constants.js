const data = {
 formSelector: '.form',
 inputSelector: '.form__input',
 submitButtonSelector: '.form__button',
 inactiveButtonClass: 'form__button_inactive',
 inputErrorClass: 'form__input_type_error',
 errorClass: 'form__input-error_active',
};

const sectionProfile = document.querySelector('.profile');
const inputName = document.querySelector('.form__name');
const inputJob = document.querySelector('.form__job');
const valueInputName = document.querySelector('.profile__title');
const valueInputJob = document.querySelector('.profile__text');
const avatarSelector = document.querySelector('.profile__image');
const buttonEditProfile = document.querySelector('.form__button-save');
const buttonNewCard = document.querySelector('.form__button-create');
const cardContainer = document.querySelector('.card');
const imagePopupSelector = document.querySelector('.pop-up');
const editProfilePopupSelector = document.querySelector('.form-edit');
const addNewCardPopupSelector = document.querySelector('.form-add');
const popupWithConfirmSelector = document.querySelector('.form-confirm-container');
const popupAvatarSelector = document.querySelector('.form-avatar');

export {
 sectionProfile,
 inputName,
 inputJob,
 valueInputName,
 valueInputJob,
 avatarSelector,
 cardContainer,
 imagePopupSelector,
 popupWithConfirmSelector,
 popupAvatarSelector,
 editProfilePopupSelector,
 addNewCardPopupSelector,
 buttonEditProfile,
 buttonNewCard,
 data,
};
