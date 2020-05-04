import { types, getParent, applySnapshot } from 'mobx-state-tree';
import { RootModel } from './RootModel';

const authStore = types
	.model('AuthStore', {
		isLoggedIn: types.boolean,
		inProgress: types.boolean,
		meta: types.string,
	})
	.views((self) => ({
		get getMeta() {
			return self.meta;
		},
		get LoggedInStatus() {
			return self.isLoggedIn;
		},
		get progress() {
			return self.inProgress;
		},
	}))
	.actions((self) => {
		function setMeta(value) {
			applySnapshot(self, { ...self, meta: value });
		}

		function progressing(value) {
			applySnapshot(self, { ...self, inProgress: value });
		}

		function _setLoginState(value) {
			applySnapshot(self, { ...self, isLoggedIn: value });
		}

		function logout() {
			progressing(true);
			// fetch('/api/logout')
			// 	.then(res => res.json())
			// 	.then(({ success }) => {
			// 		if (success) {
			// 			progressing(false);
			// 			_setLoginState(false);
			// 		}
			// 	});
		}

		function login(email, password) {
			progressing(true);
			if (email === '') {
				self.meta = 'Email ID is required';
				progressing(false);
				return;
			} else if (password === '') {
				self.meta = 'Password is required';
				progressing(false);
				return;
			}
			const regexp = new RegExp(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
			if (!regexp.test(email)) {
				self.meta = 'Invalid Email Address';
				progressing(false);
				return;
			}
			progressing(false);
			_setLoginState(true);
			console.log('Logged in');
			// fetch('/login').then((res) => console.log(res));
			// fetch('/api/login', {
			//     method: 'POST',
			//     headers: {
			//         'Content-Type': 'application/json',
			//     },
			//     body: JSON.stringify({ email: email, password: password }),
			// })
			//     .then(res => {
			//         if (res.status === 200) {
			//             return res.json();
			//         } else if (res.status === 401) {
			//             setMeta('You have entered an incorrect Email/Password');
			//             progressing(false);
			//             return;
			//         } else {
			//             setMeta('Something went wrong. Please try again!');
			//             progressing(false);
			//             return;
			//         }
			//     })
			//     .then(({ success, data }) => {
			//         if (success) {
			//             _setLoginState(true);
			//             progressing(false);
			//         }
			//     })
			//     .catch(error => {
			//         console.log(error);
			//     });
		}

		return {
			_setLoginState,
			login,
			logout,
			setMeta,
			progressing,
		};
	});
export { authStore };
