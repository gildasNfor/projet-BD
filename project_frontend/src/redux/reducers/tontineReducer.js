import { actionTypes } from "../actions/tontineActions";

const initialState = {

    tontines: [],
};

const tontineReducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.SET_TONTINES:

            return {...state, tontines: action.tontines}

        default:
            return state;
    }
}

export default tontineReducer;