import { overlay, popup, sectionProfile, btnCloseForm, btnSaveForm, btnCreateForm, showElement, showAlertBox, closeElement, saveForm, valueInputJob, valueInputName, inputTitle, cardContainer } from './index.js';

import { Card } from './card.js';

const card = new Card();

sectionProfile.addEventListener('click', (event) => {
 if (event.target.classList.contains('profile__edit')) {
  showElement('formEdit');
  btnSaveForm.classList.add('form__button_inactive');
 } else if (event.target.classList.contains('profile__add')) {
  showElement();
 } else {
  return;
 }
});

btnCloseForm.forEach((e) => {
 e.addEventListener('click', () => {
  closeElement('form');
 });
});

overlay.addEventListener('click', () => {
 closeElement('form');
});

btnSaveForm.addEventListener('click', (event) => {
 saveForm();
 event.preventDefault();
 showAlertBox(`Selamat perubahan data ${valueInputName.textContent} dan ${valueInputJob.textContent} telah berhasil !!!`);
});

popup.addEventListener('click', (event) => {
 if (event.target.classList.contains('pop-up__icon')) {
  closeElement();
 }
});

btnCreateForm.addEventListener('click', (event) => {
 event.preventDefault();
 card.addInitialCards();
 card.setEventListenersFilterCard();
 showAlertBox(`Selamat data berhasil di tambahkan dengan judul ${inputTitle.value}`);
 closeElement('form');

 const form = document.forms['formAdd'];
 form.reset();

 btnCreateForm.classList.add('form__button_inactive');
});
