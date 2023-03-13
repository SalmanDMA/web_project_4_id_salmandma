const overlay = document.querySelector('.overlay');
const formEdit = document.querySelector('.form-edit');
const formAdd = document.querySelector('.form-add');
const btnEditForm = document.querySelector('.profile__edit');
const btnAddForm = document.querySelector('.profile__add');
const btnSaveForm = document.querySelector('.form__button-save');
const btnCreateForm = document.querySelector('.form__button-create');
const btnCloseForm = document.querySelectorAll('.form__icon');
const inputName = document.querySelector('.form__name');
const inputJob = document.querySelector('.form__job');
const valueInputName = document.querySelector('.profile__title');
const valueInputJob = document.querySelector('.profile__text');

// untuk overlay umum (button edit, tambah dan popup)
// profilex
function showForm() {
	overlay.style.display = 'block';
	formEdit.style.display = 'block';

	inputName.value = valueInputName.textContent;
	inputJob.value = valueInputJob.textContent;
}

function showFormAdd() {
	overlay.style.display = 'block';
	formAdd.style.display = 'block';
}

function closeForm() {
	// semua yang punya overlay
	overlay.style.display = 'none';

	// utnuk button edit profile
	formEdit.classList.add('close');

	// untuk button tambah card
	formAdd.classList.add('close');

	// // untuk pop-up image
	container.classList.add('close');

	setTimeout(() => {
		formEdit.classList.remove('close');
		formEdit.style.display = 'none';

		formAdd.classList.remove('close');
		formAdd.style.display = 'none';

		container.classList.remove('close');
		container.style.display = 'none';
	}, 300);
}

function saveForm() {
	valueInputName.textContent = inputName.value;
	valueInputJob.textContent = inputJob.value;

	closeForm();
}

function showAlert() {
	const sectionProfile = document.querySelector('.profile');
	const alertContainer = document.createElement('section');
	alertContainer.classList.add('alert');
	const alertText = document.createElement('h3');
	alertText.classList.add('alert__text');
	alertText.textContent = `Selamat perubahan data ${valueInputName.textContent} dan ${valueInputJob.textContent} telah berhasil !!!`;

	alertContainer.append(alertText);
	sectionProfile.before(alertContainer);

	setTimeout(() => {
		alertContainer.classList.add('close');
	}, 3000);
	setTimeout(() => {
		alertContainer.remove();
	}, 4000);
}

btnEditForm.addEventListener('click', showForm);

btnAddForm.addEventListener('click', showFormAdd);

btnCloseForm.forEach((e) => {
	e.addEventListener('click', closeForm);
});

overlay.addEventListener('click', closeForm);

btnSaveForm.addEventListener('click', (event) => {
	saveForm();
	event.preventDefault();
	showAlert();
});

// card section
const initialCards = [
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

const inputTitle = document.querySelector('input[name="inputJudul"]');
const inputUrl = document.querySelector('input[name="inputTautanGambar"]');

function addInitialCards() {
	const result = {
		name: inputTitle.value,
		link: inputUrl.value,
	};
	initialCards.unshift(result);
}

const parentElementCard = document.querySelector('.card');
const cardTemplate = document.querySelector('#cardTemplate');
function showInitialCards() {
	initialCards.forEach((card) => {
		const newCard = cardTemplate.content.cloneNode(true);

		const cardImage = newCard.querySelector('.card__image');
		cardImage.setAttribute('src', card.link);
		cardImage.setAttribute('alt', card.name);

		const cardTitle = newCard.querySelector('.card__title');
		cardTitle.textContent = card.name;
		cardTitle.setAttribute('title', card.name);

		parentElementCard.append(newCard);
	});
}

showInitialCards();

const ElementCard = document.querySelector('.card__item');

function filteredCard() {
	const newInputCard = inputTitle.value;
	const filterCard = initialCards.filter((card) => card.name === newInputCard);

	const newCardContainer = document.createElement('div');
	newCardContainer.classList.add('card__item');

	const newCardImage = document.createElement('img');
	newCardImage.classList.add('card__image');
	newCardImage.setAttribute('src', filterCard[0].link);
	newCardImage.setAttribute('alt', filterCard[0].name);

	const newCardBtn = document.createElement('button');
	newCardBtn.classList.add('card__icon-delete', 'hover-icon');

	const newCardMainText = document.createElement('div');
	newCardMainText.classList.add('card__main-text');

	const newCardTitle = document.createElement('h3');
	newCardTitle.classList.add('card__title');
	newCardTitle.setAttribute('title', filterCard[0].name);
	newCardTitle.textContent = filterCard[0].name;

	const newCardBtnHeart = document.createElement('button');
	newCardBtnHeart.classList.add('card__icon', 'hover-icon');

	newCardMainText.append(newCardTitle, newCardBtnHeart);

	newCardContainer.append(newCardImage, newCardBtn, newCardMainText);

	const referenceNode = parentElementCard.firstChild;

	parentElementCard.insertBefore(newCardContainer, referenceNode);
}

function showAlertCard() {
	const sectionProfile = document.querySelector('.profile');
	const alertContainer = document.createElement('section');
	alertContainer.classList.add('alert');
	const alertText = document.createElement('h3');
	alertText.classList.add('alert__text');
	alertText.textContent = `Selamat data berhasil di tambahkan dengan judul ${inputTitle.value}`;

	alertContainer.append(alertText);
	sectionProfile.before(alertContainer);

	setTimeout(() => {
		alertContainer.classList.add('close');
	}, 3000);
	setTimeout(() => {
		alertContainer.remove();
	}, 4000);
}

btnCreateForm.addEventListener('click', (event) => {
	event.preventDefault();
	addInitialCards();
	filteredCard();
	showAlertCard();
	closeForm();

	inputTitle.value = '';
	inputUrl.value = '';
});

parentElementCard.addEventListener('click', (event) => {
	if (event.target.classList.contains('card__icon-delete')) {
		event.target.parentElement.remove();
	} else if (event.target.classList.contains('card__icon')) {
		event.target.classList.toggle('toggle');
	} else if (event.target.classList.contains('card__image')) {
		showPopUp();
	} else {
		return;
	}
});
// card section end

// pop up
const container = document.querySelector('.pop-up');
function showPopUp() {
	const popUpImage = document.querySelector('.pop-up__image');
	const srcImg = event.target.src;
	const altImg = event.target.alt;
	popUpImage.setAttribute('src', srcImg);
	popUpImage.setAttribute('alt', altImg);

	const popUpTitle = document.querySelector('.pop-up__title');
	popUpTitle.textContent = altImg;

	overlay.style.display = 'block';
	container.style.display = 'block';
}

function closePopUp() {
	overlay.style.display = 'none';
	container.classList.add('close');

	setTimeout(() => {
		container.classList.remove('close');
		container.style.display = 'none';
	}, 300);
}

// event buat nutup pop-up
container.addEventListener('click', (event) => {
	if (event.target.classList.contains('pop-up__icon')) {
		closePopUp();
	}
});
// pop up end
