import {HttpUtils} from "../utils/http-utils";
import {AuthUtils} from "../utils/auth-utils";

export class Sidebar {
    constructor() {
        this.balanceElement = document.getElementById('balance__amount');
        this.personName = document.getElementById('profile-name');
        this.init().then();
    }

    async init() {

        let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoTokenKey);
        userInfo = JSON.parse(userInfo);
        try {
            const result = await HttpUtils.request('/balance');
            if (result) {
                if (result.error) {
                    throw new Error(result.error);
                }
                this.balanceElement.innerText = result.response.balance;
            }
        } catch (error) {
            return console.log(error)
        }
        this.personName.innerText = userInfo.name;
    }
}