import {AuthUtils} from "../../utils/auth-utils.js";
import {ValidationUtils} from "../../utils/validation-utils.js";
import {AuthService} from "../../services/auth-service.js";

export class SignUp {

    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.getAuthInfo('accessToken')) {
            return this.openNewRoute('/');
        }

        this.nameElement = document.getElementById('name');
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.passwordRepeatElement = document.getElementById('password-repeat');
        this.commonErrorElement = document.getElementById('common-error-signup');

        this.findElements();

        document.getElementById('process-button').addEventListener('click', this.signUp.bind(this));
    }

    findElements() {
        this.validations = [
            {element: this.nameElement, options: {pattern: /^[А-Яа-я]{2,}\s+[А-Яа-я]{2,}\s+[А-Яа-я]{2,}\s*$/}},
            {element: this.emailElement, options: {pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/}},
            {element: this.passwordElement, options: {pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/}},
            {element: this.passwordRepeatElement, options: {compareTo: this.passwordElement.value}},
        ];
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none';
        for (let i = 0; i < this.validations.length; i++) {
            if (this.validations[i].element === this.passwordRepeatElement) {
                this.validations[i].options.compareTo = this.passwordElement.value;
            }
        }

        const errorElement = document.getElementById('common-error-signup');

        if (ValidationUtils.validateForm(this.validations, errorElement)) {
            const signupResult = AuthService.signUp({
                name: this.nameElement.value.split(' ')[0],
                lastName: this.nameElement.value.split(' ')[1],
                email: this.emailElement.value,
                password: this.passwordElement.value,
                passwordRepeat: this.passwordRepeatElement,
            });
            if (signupResult) {
                AuthUtils.setAuthInfo(signupResult.accessToken, signupResult.refreshToken, {
                    id: signupResult.id,
                    name: signupResult.name,
                    lastName: signupResult.lastName,

                });
                return this.openNewRoute('/');
            }
            this.commonErrorElement.style.display = 'block';
        }
    }

}