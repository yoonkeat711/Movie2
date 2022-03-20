import {observable, action, computed} from 'mobx';
import {CORRECT_PASSWORD, CORRECT_USERNAME} from './constants';

export class LoginStore {
  @observable loginState = false;

  @action updateLoginState = (username, password) => {
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      this.loginState = true;
    } else this.loginState = false;
  };

  @action logout = () => {
      this.loginState = true;
  }

  @computed getLoginState() {
    return this.loginState;
  }
}
