const showInputError = (formElement, inputElement, errorMessage, config) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(config.inputErrorClass);

	errorElement.textContent = errorMessage;
	errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(config.inputErrorClass);

	errorElement.classList.remove(config.errorClass);
	errorElement.textContent = ' ';
};

const isValid = (formElement, inputElement, config) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, inputElement.validationMessage, config);
	} else {
		hideInputError(formElement, inputElement, config);
	}
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
};

const toggleButtonState = (inputList, buttonElement, config) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(config.inactiveButtonClass);
	} else {
		buttonElement.classList.remove(config.inactiveButtonClass);
	}
};

const setEventListeners = (formElement, config) => {
	const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
	const buttonElement = formElement.querySelector(config.submitButtonSelector);

	// ini di panggil agar ketika pop up pertama muncul buttonnya dalam keadaaan disabled
	toggleButtonState(inputList, buttonElement, config);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement, config);

			toggleButtonState(inputList, buttonElement, config);
		});
	});
};

const enableValidation = (config) => {
	const formList = Array.from(document.querySelectorAll(config.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});

		setEventListeners(formElement, config);

		formElement.addEventListener('keydown', (evt) => {
			if (evt.keyCode === 27) {
				closeElement('form');
			}
		});
	});
};

enableValidation({
	formSelector: '.form',
	inputSelector: '.form__input',
	submitButtonSelector: '.form__button',
	inactiveButtonClass: 'form__button_inactive',
	inputErrorClass: 'form__input_type_error',
	errorClass: 'form__input-error_active',
});
