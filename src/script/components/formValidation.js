import { closeElement } from '../pages/index.js';

class FormValidator {
 constructor(config, formElement) {
  this._config = config;
  this._formElement = formElement;
  this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
 }

 _showInputError(inputElement, errorMessage) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(this._config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._config.errorClass);
 }

 _hideInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(this._config.inputErrorClass);
  errorElement.classList.remove(this._config.errorClass);
  errorElement.textContent = '';
 }

 _isValid(inputElement) {
  if (!inputElement.validity.valid) {
   this._showInputError(inputElement, inputElement.validationMessage);
  } else {
   this._hideInputError(inputElement);
  }
 }

 _hasInvalidInput() {
  return this._inputList.some((inputElement) => {
   return !inputElement.validity.valid;
  });
 }

 _toggleButtonState() {
  if (this._hasInvalidInput()) {
   this._buttonElement.classList.add(this._config.inactiveButtonClass);
   this._buttonElement.disabled = true;
  } else {
   this._buttonElement.classList.remove(this._config.inactiveButtonClass);
   this._buttonElement.disabled = false;
  }
 }

 _setEventListeners() {
  this._inputList.forEach((inputElement) => {
   inputElement.addEventListener('input', () => {
    this._isValid(inputElement);
    this._toggleButtonState();
   });
  });
 }

 _setSubmitEventListeners() {
  this._formElement.addEventListener('submit', (evt) => {
   evt.preventDefault();
  });

  this._setEventListeners();
 }

 enableValidation() {
  this._setSubmitEventListeners();
  this._toggleButtonState();
 }
}

const data = {
 formSelector: '.form',
 inputSelector: '.form__input',
 submitButtonSelector: '.form__button',
 inactiveButtonClass: 'form__button_inactive',
 inputErrorClass: 'form__input_type_error',
 errorClass: 'form__input-error_active',
};

const forms = Array.from(document.querySelectorAll(data.formSelector));

export { forms, FormValidator, data };