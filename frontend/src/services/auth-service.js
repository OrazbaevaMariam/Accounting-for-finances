
import {HttpUtils} from "../utils/http-utils.js"
export class AuthService {
    static async logIn(data){
        const result = await HttpUtils.request('/login', 'POST', false, data);

        if (result.error || !result.response.user || !result.response || (result.response && (!result.response.tokens.accessToken || !result.response.tokens.refreshToken))) {
            return false;
        }

        return result.response;
    }
    static async signUp(data){
        const result = await HttpUtils.request('/signup', 'POST', false, data);
        if (result.error || !result.user || !result.response || (result.response && (!result.response.accessToken || !result.response.refreshToken))) {
            return false;
        }

        return result.response;
    }

    static async logOut(data){
        await HttpUtils.request('/logout', 'POST', false, data);
    }


}