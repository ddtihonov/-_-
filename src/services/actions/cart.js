import {getItemsRequest} from '../fakeApi';

export const INCREASE_ITEM = 'INCREASE_ITEM'; //увеличение количества товаров,
export const DECREASE_ITEM = 'DECREASE_ITEM';//уменьшение количества товаров,
export const DELETE_ITEM = 'DELETE_ITEM';//удаление товара
export const CANCEL_PROMO = 'CANCEL_PROMO';//отмена промокода,
export const TAB_SWITCH = 'TAB_SWITCH';//переключение между вкладками «Отложенные товары» и «Товары в корзине».
//Список товаров корзины
export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';//отображается, если запрос отправлен.
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';//показывается в случае успеха, когда запрос выполнен и данные получены.
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED'//используется в случае ошибки
//Рекомендуемые товары
export const GET_RECOMMENDED_ITEMS_REQUEST = 'GET_RECOMMENDED_ITEMS_REQUEST'//отображается, если запрос отправлен.
export const GET_RECOMMENDED_ITEMS_SUCCESS  = 'GET_RECOMMENDED_ITEMS_SUCCESS'//показывается в случае успеха, когда запрос выполнен и товары получены.
export const GET_RECOMMENDED_ITEMS_FAILED = 'GET_RECOMMENDED_ITEMS_FAILED'//используется в случае ошибки при выполнении запроса.

export function getItems (){
    return (dispatch) => {
        dispatch({
            type: GET_ITEMS_REQUEST
        });

    getItemsRequest().then(res => {
    if (res && res.success) {
        dispatch({
        type: GET_ITEMS_SUCCESS,
        items: res.data
    });
    } else {
        dispatch({
            type: GET_ITEMS_FAILED
    });
    }
}); 
}
};