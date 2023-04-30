export default class AlertBox {
 constructor({ sectionProfile, alertContainer, alertText }) {
  this.sectionProfile = sectionProfile;
  this.alertContainer = document.createElement(alertContainer);
  this.alertText = document.createElement(alertText);
 }

 generateAlertBox(textContent) {
  this.alertContainer.classList.add('alert');
  this.alertText.classList.add('alert__text');
  this.alertText.textContent = textContent;

  this._addItemAlertBox();
  this._deleteAlertBox();
 }

 _addItemAlertBox() {
  this.alertContainer.append(this.alertText);
  this.sectionProfile.before(this.alertContainer);
 }

 _deleteAlertBox() {
  setTimeout(() => {
   this.alertContainer.classList.add('close');
  }, 3000);
  setTimeout(() => {
   this.alertContainer.classList.remove('close');
   this.alertContainer.remove();
  }, 4000);
 }
}
