export default class UserInfo {
 constructor(nameSelector, jobselector) {
  this._name = nameSelector;
  this._job = jobselector;
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
}
