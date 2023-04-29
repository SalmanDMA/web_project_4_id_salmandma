const items = [
 {
  name: 'Lembah Yosemite',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
 },
 {
  name: 'Danau Louise',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
 },
 {
  name: 'Pegunungan Gundul',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg',
 },
 {
  name: 'Gunung Latemar',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg',
 },
 {
  name: 'Taman Nasional Vanoise',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg',
 },
 {
  name: 'Lago di Braies',
  link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg',
 },
];

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
const buttonEditProfile = document.querySelector('.form__button-save');
const buttonNewCard = document.querySelector('.form__button-create');
const cardContainer = document.querySelector('.card');
const imagePopupSelector = document.querySelector('.pop-up');
const editProfilePopupSelector = document.querySelector('.form-edit');
const addNewCardPopupSelector = document.querySelector('.form-add');

export { items, sectionProfile, inputName, inputJob, valueInputName, valueInputJob, cardContainer, imagePopupSelector, editProfilePopupSelector, addNewCardPopupSelector, buttonEditProfile, buttonNewCard, data };
