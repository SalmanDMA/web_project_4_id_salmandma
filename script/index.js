const heartIcon = document.querySelectorAll('.card__icon');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('.form');
const btnEditForm = document.querySelector('.profile__edit');
const btnSaveForm = document.querySelector('.form__button');
const btnCloseForm = document.querySelector('.form__icon');
const inputName = document.querySelector('.form__name');
const inputJob = document.querySelector('.form__job');
const valueInputName = document.querySelector('.profile__title');
const valueInputJob = document.querySelector('.profile__text');

function showForm() {
	overlay.style.display = 'block';
	form.style.display = 'block';

	inputName.value = valueInputName.textContent;
	inputJob.value = valueInputJob.textContent;
}

function closeForm() {
	overlay.style.display = 'none';
	form.classList.add('close');

	setTimeout(() => {
		form.classList.remove('close');
		form.style.display = 'none';
	}, 500);
}

btnEditForm.addEventListener('click', showForm);
btnCloseForm.addEventListener('click', closeForm);
overlay.addEventListener('click', closeForm);
btnSaveForm.addEventListener('click', (event) => {
	valueInputName.textContent = inputName.value;
	valueInputJob.textContent = inputJob.value;

	overlay.style.display = 'none';
	form.style.display = 'none';

	event.preventDefault();

	setTimeout(() => {
		alert(`Selamat perubahan data ${valueInputName.textContent} dan ${valueInputJob.textContent} telah berhasil !!!`);
	}, 500);
});

heartIcon.forEach((e) => {
	e.addEventListener('click', () => {
		const heartState = e.getAttribute('src');
		if (heartState === './images/icon/heartBlack.svg') {
			e.setAttribute('src', './images/icon/heart.svg');
		} else {
			e.setAttribute('src', './images/icon/heartBlack.svg');
		}
	});
});
