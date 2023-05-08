export default class UserInfo {
 constructor(nameSelector, jobselector, avatarSeclector) {
  this._name = nameSelector;
  this._job = jobselector;
  this._avatar = avatarSeclector;
 }

 getUserInfo() {
  return {
   name: this._name.textContent,
   job: this._job.textContent,
  };
 }

 setUserInfo(data) {
  this._name.textContent = data.inputName;
  this._job.textContent = data.inputJob;
 }

 setUserAvatar(avatar) {
  this._avatar.src = avatar;
 }
}
