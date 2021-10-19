import store from "../js/store/index";
import { addEmployeeList,addTotalRecieved,addTotalRecipient,
    addPercentageDiff,addTotalBalance,addCustomer } from "../js/actions/index";

window.store = store;
window.addEmployeeList = addEmployeeList;
window.addTotalRecieved = addTotalRecieved;
window.addTotalRecipient = addTotalRecipient;
window.addPercentageDiff = addPercentageDiff;
window.addTotalBalance = addTotalBalance;
window.addCustomer = addCustomer;