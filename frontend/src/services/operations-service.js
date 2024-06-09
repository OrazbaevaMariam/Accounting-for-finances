import {HttpUtils} from "../utils/http-utils";

export class OperationsService {
    static async getOperations() {
        const returnObject = {
            error: false,
            redirect: null,
            incomes: null
        };
        const result = await HttpUtils.request('/operations');

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error))) {
            returnObject.error = 'Возникла ошибка при запросе операций. Обратитесь в поддержку';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.orders = result.response.orders;
        return returnObject;
    }

    static async getOperationsFilter(interval = null, firstDate = null, secondDate = null, filterType) {
        const returnObject = {
            error: false,
            redirect: null,
            response: null

        };
        const result = await HttpUtils.request('/operations?period=' + interval ? +'&dateFrom=' + firstDate + '&dateTo=' + secondDate : filterType);

        if (result.redirect || result.error || !result.response || (result.response && (result.response.error))) {
            returnObject.error = 'Возникла ошибка при запросе операций. Обратитесь в поддержку';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.response = result.response;
        return returnObject;
    }

    static async getOperation(id) {

        const returnObject = {
            error: false,
            redirect: null,
            income: null
        };

        const result = await HttpUtils.request('/operations/' + id);

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при запросе дохода. Обратитесь в поддержку';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.order = result.response;
        return returnObject;
    }

    static async createOperation(data) {

        const returnObject = {
            error: false,
            redirect: null,
            id: null
        };

        const result = await HttpUtils.request('/operations', 'POST', true, data);
        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при создании дохода. Обратитесь в поддержку';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.id = result.response.id;
        return returnObject;
    }

    static async updateOperation(id, data) {

        const returnObject = {
            error: false,
            redirect: null,
        };

        const result = await HttpUtils.request('/operations/' + id, 'PUT', true, data);
        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при редактировании дохода. Обратитесь в поддержку';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        return returnObject;
    }

    static async deleteOperation(id) {

        const returnObject = {
            error: false,
            redirect: null,
        };

        const result = await HttpUtils.request('/operations/' + id, 'DELETE', true);
        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при удалении дохода. Обратитесь в поддержку';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        return returnObject;
    }
}