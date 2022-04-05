import { SET_ACTIVE_LIST_ITEM, SET_SIDEBAR_WIDTH } from "./constants";

export const sidebarReducer  = (state, action) =>{
    switch(action.type){
        case SET_ACTIVE_LIST_ITEM:
            return { ...state, activeListItem: action.listItem} ;
        case SET_SIDEBAR_WIDTH:
            return { ...state, width: action.width} ;
        default:
            return state;
    }
}