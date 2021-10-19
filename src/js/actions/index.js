import { ADD_EMPLOYEE_LIST, ADD_TOTAL_RECIEVED,ADD_TOTAL_RECIPIENT,ADD_PERCENTAGE_DIFF,ADD_TOTAL_BALANCE,
    ADD_CUSTOMER, CONCAT_EMPLOYEE_LIST } from "../constants/action-types";

export function addEmployeeList(payload) {
    return { type: ADD_EMPLOYEE_LIST, payload }
};

export function addTotalRecieved(payload) {
    return { type: ADD_TOTAL_RECIEVED, payload }
};

export function addTotalRecipient(payload) {
    return { type: ADD_TOTAL_RECIPIENT, payload }
};

export function addPercentageDiff(payload) {
    return { type: ADD_PERCENTAGE_DIFF, payload }
};

export function addTotalBalance(payload) {
    return { type: ADD_TOTAL_BALANCE, payload }
};

export function addCustomer(payload) {
    return { type: ADD_CUSTOMER, payload }
};

export function concatEmployeeList(payload){
    return { type: CONCAT_EMPLOYEE_LIST , payload }
}