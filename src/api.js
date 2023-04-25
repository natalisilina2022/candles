const onResponce = (res) => {
	return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
	constructor({ baseUrl, token }) {
		this._token = null;
		// or -> this._headers = headers;
		this._baseUrl = baseUrl;
	}


  // запрос регистрации пользователя
  singUpUser(data) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        // authorization: this._token,/
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(onResponce);
  }
// запрос авторизации пользователя
  singInUser(data) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        // authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(onResponce);
  }

// получение списка товаров
	getProductList() {
		return fetch(`${this._baseUrl}/products`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}
// получение товаров по ID
  getProductById(idProduct) {
    return fetch(`${this._baseUrl}/products/${idProduct}`, {
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        }
    }).then(onResponce)
}
// получение информации о пользователе
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}
 
  search(searchQuery) {
    return fetch(`${this._baseUrl}/products/search?query=${searchQuery}`,{
        headers: {
            authorization: this._token
        }
    }).then( response => response.ok ? response.json() : Promise.reject(response.status))
  }
 // изменение информации о пользователе
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(onResponce);
  }
   // изменение статуса "избранный товар"
  changeLikeProductStatus(productID, like) {
    // Обычная реализация: 2 разных метода для удаления и постановки лайка.
    return fetch(`${this._baseUrl}/products/likes/${productID}`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(onResponce);
  }
 // создать отзыв
  setReview(id, text) {
    return fetch(`${this._baseUrl}/products/review/${id}`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(text),
    }).then(onResponce);
  }
 // получение отзывов о товаре
  getProductReviews(id) {
		return fetch(`${this._baseUrl}/products/review/${id}`, {
			headers: {
				authorization: this._token,
			},
		}).then(onResponce);
	}

}


const config = {
    baseUrl:'https://api.react-learning.ru',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2U2YTNmOTU5Yjk4YjAzOGY3N2I1MDQiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc2MDU5ODkzLCJleHAiOjE3MDc1OTU4OTN9.IMqZSFdNNe5qGC9w76F5H6-2x_7wxc-8F_5hIiVRt5s'
}


const api = new Api(config)

export default api;