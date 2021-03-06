import PubSub from './PubSub.js';

const BASE_URL = 'http://127.0.0.1:8000';
const TOKEN_KEY = 'token';

export default {
	getProducts: async (id = null) => {
		let url = `${BASE_URL}/api/products`;
		if (id) {
			url += `/${id}`;
		}

		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				if (id) {
					data.name = data.name.replace(/(<([^>]+)>)/gi, '');
					data.price = data.price.replace(/(<([^>]+)>)/gi, '');
					data.transactionType = data.transactionType.replace(
						/(<([^>]+)>)/gi,
						''
					);
				} else {
					data.forEach((product) => {
						product.name = product.name.replace(/(<([^>]+)>)/gi, '');
						product.price = product.price.replace(/(<([^>]+)>)/gi, '');
						product.transactionType = product.transactionType.replace(
							/(<([^>]+)>)/gi,
							''
						);
					});
				}
				return data;
			} else {
				if (id) {
					return '';
				} else {
					const error = `HTTP Error: ${response.status}`;
					throw new Error(error);
				}
			}
		} catch (error) {
			throw error;
		}
	},

	post: async function (url, postData, json = true) {
		return await this.request('POST', url, postData, json);
	},

	delete: async function (url) {
		return await this.request('DELETE', url, {});
	},

	request: async function (method, url, postData, json = true) {
		const config = {
			method: method,
			headers: {},
			body: null,
		};
		if (json) {
			config.headers['Content-type'] = 'application/json';
			config.body = JSON.stringify(postData);
		} else {
			config.body = postData;
		}

		const token = await this.getToken();
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		const response = await fetch(url, config);
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(
				`${response.status} ${data.message}` || JSON.stringify(error)
			);
		}
	},

	registerUser: async function (user) {
		const url = `${BASE_URL}/auth/register`;
		return await this.post(url, user);
	},

	login: async function (user) {
		const url = `${BASE_URL}/auth/login`;
		return await this.post(url, user);
	},

	saveToken: async function (token) {
		localStorage.setItem(TOKEN_KEY, token);
	},

	deleteToken: async function () {
		localStorage.removeItem(TOKEN_KEY);
	},

	getToken: async function () {
		return localStorage.getItem(TOKEN_KEY);
	},

	isUserLogged: async function () {
		const token = await this.getToken();
		return token !== null;
	},

	saveProduct: async function (product) {
		const url = `${BASE_URL}/api/products`;
		if (product.image) {
			const imageURL = await this.uploadImage(product.image);
			product.image = imageURL;
		}
		return await this.post(url, product);
	},

	uploadImage: async function (image) {
		const form = new FormData();
		form.append('file', image);
		const url = `${BASE_URL}/upload`;
		const response = await this.post(url, form, false);
		return response.path || null;
	},

	getUser: async function () {
		const token = await this.getToken();
		try {
			const tokenParts = token.split('.');
			if (tokenParts.length !== 3) {
				return null;
			}
			const payload = tokenParts[1];
			const jsonStr = atob(payload);
			const { userId, username } = JSON.parse(jsonStr);
			return { userId, username };
		} catch (error) {
			return null;
		}
	},

	deleteProduct: async function (idProduct) {
		try {
			const url = `${BASE_URL}/api/products/${idProduct}`;
			return await this.delete(url);
		} catch (error) {}
	},
};
