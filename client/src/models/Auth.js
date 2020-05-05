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
			self.meta = value;
		}

		function progressing(value) {
			self.inProgress = value;
		}

		function _setLoginState(value) {
			self.isLoggedIn = value;
		}

		function logout() {
			progressing(true);
			_setLoginState(false);
			progressing(false);
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
