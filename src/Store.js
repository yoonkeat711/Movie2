import { observable, action, computed } from "mobx";

export class LoginState {
    @observable isLoggedIn = false;

    constructor(value) {
        this.isLoggedIn = value
    }
}

export class LoginStore {
    @observable loginState = false;

    @action updateLoginState = (value) => {
        this.loginState = value;
    }

    @computed getLoginState() {
        return this.loginState;
    }
}