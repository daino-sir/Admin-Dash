import { ADD_EMPLOYEE_LIST, ADD_TOTAL_RECIEVED,ADD_TOTAL_RECIPIENT,ADD_PERCENTAGE_DIFF,ADD_TOTAL_BALANCE,
    ADD_CUSTOMER , CONCAT_EMPLOYEE_LIST} from "../constants/action-types";

const initialState = {
    employeeList: [],
    totalRecieved: 0,
    totalRecipient: 0,
    percentageDiff:0,
    totalBalance:0,
    customer:[]
  };
  
  function rootReducer(state = initialState, action) {

    if (action.type === ADD_EMPLOYEE_LIST) {

        return Object.assign({}, state, {
            employeeList: action.payload
        });

    }else if(action.type === CONCAT_EMPLOYEE_LIST){

        return Object.assign({}, state, {
            employeeList: state.employeeList.concat(action.payload)
        });

    }else if(action.type === ADD_TOTAL_RECIEVED){

        return Object.assign({}, state, {
            totalRecieved:action.payload
        });

    }else if(action.type === ADD_TOTAL_RECIPIENT){

        return Object.assign({}, state, {
            totalRecipient:action.payload
        });
        
    }else if(action.type === ADD_PERCENTAGE_DIFF){

        return Object.assign({}, state, {
            percentageDiff:action.payload
        });

    }else if(action.type === ADD_TOTAL_BALANCE){

        return Object.assign({}, state, {
            totalBalance:action.payload
        });

    }else if(action.type === ADD_CUSTOMER){

        return Object.assign({}, state, {
            customer:action.payload
        });
    }

    return state;
  };
  
  export default rootReducer;