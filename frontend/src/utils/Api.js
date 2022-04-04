class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _errorHandler(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() {  //     •	получить список всех карточек в виде массива (GET)
        return fetch(`${this._url}cards`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => this._errorHandler(res));
    }

    addNewCard(data) {  //   •	добавить карточку (POST)
        return fetch(`${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
                    
                }),
        }).then((res) => this._errorHandler(res));
    }

    deleteCard(data) { // •	удалить карточку (DELETE)
        return fetch(`${this._url}cards/${data}`, {
            method: "DELETE",
            headers: this._headers,
            
        }).then((res) => this._errorHandler(res));
    }

    getUserInfo() {    //получить данные пользователя (GET)
        return fetch(`${this._url}users/me`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => {
            return res.json();
        });
    }

    setUserInfo(data) {// •	заменить данные пользователя (PATCH)
        return fetch(`${this._url}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then((res) => this._errorHandler(res));
    }

    setUserAvatar(data) {  // •	заменить аватар (PATCH)
        // console.log(data);
        return fetch(`${this._url}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then((res) => this._errorHandler(res));
    }
    
    addCardLike(data) { // •	“залайкать” карточку (PUT)
        return fetch(`${this._url}cards/${data._cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
            
        }).then((res) => this._errorHandler(res));
    }

    changeLikeCardStatus(data, isLiked) { // •	“залайкать” карточку 
        const promise = !isLiked
        return fetch(`${this._url}cards/${data}/likes`, {
            method: promise ? 'DELETE' : 'PUT',
            headers: this._headers,
            
        }).then((res) => this._errorHandler(res));
    }
    

    deleteCardLike(data) { // •	удалить лайк карточки (DELETE)
        return fetch(`${this._url}cards/${data._cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
            
        }).then((res) => this._errorHandler(res));
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-33/',
    headers: {
        Authorization: 'be382cad-ad48-4296-8278-8fad1d3ee484',
        "content-type": "application/json"
    }
});

export default api;