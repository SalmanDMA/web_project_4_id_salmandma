class Api {
 constructor({ baseUrl, headers }) {
  this.baseUrl = baseUrl;
  this.headers = headers;
 }
 getInitialCardsAndUserInfo() {
  return Promise.all([this.getInitialCards(), this.getUserInfo()]);
 }
 async getUserInfo() {
  const res = await fetch(`${this.baseUrl}/users/me`, {
   headers: this.headers,
  });

  if (res.ok) {
   return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
 }

 async getInitialCards() {
  const res = await fetch(`${this.baseUrl}/cards`, {
   headers: this.headers,
  });

  if (res.ok) {
   return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
 }

 async postNewCard(data) {
  const res = await fetch(`${this.baseUrl}/cards`, {
   method: 'POST',
   headers: this.headers,
   body: JSON.stringify({
    name: data.inputJudul,
    link: data.inputTautanGambar,
   }),
  });

  if (res.ok) {
   return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
 }

 async updateLikeCard(cardId, isLiked) {
  const method = isLiked ? 'DELETE' : 'PUT';
  const res = await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
   headers: this.headers,
   method,
  });

  if (res.ok) {
   return res.json();
  }
  console.log(res);
  return Promise.reject(`Error: ${res.status} `);
 }

 async patchUserInfo(data) {
  const res = await fetch(`${this.baseUrl}/users/me`, {
   method: 'PATCH',
   headers: this.headers,
   body: JSON.stringify({
    name: data.inputName,
    about: data.inputJob,
   }),
  });

  if (res.ok) {
   return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
 }
}

export default Api;
