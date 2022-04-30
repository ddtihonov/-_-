import { combineReducers } from 'redux';

import { cartReducer } from './cart';

import {
    PREVIOUS_STEP,
    NEXT_STEP,
} from '../actions/index';

const stepReducer = (state = 'cart', action) => {
    switch (action.type) {
        case NEXT_STEP: {
            return state === 'cart'
            ? 'delivery'
            : state === 'delivery'
            ? 'checkout'
            : state === 'checkout'
            ? 'checkout'
            : 'checkout';
        }
        case PREVIOUS_STEP: {
            return state === 'cart'
            ? 'cart' 
            : state === 'cart'
            ? 'delivery'
            : state === 'cart'
            ? 'checkout'
            : state === 'delivery';
        } 
        default: {
            return state;
        }
    }
};

export const rootReducer = combineReducers({
    cart: cartReducer,
    step: stepReducer,
});