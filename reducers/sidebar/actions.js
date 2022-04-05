import { SET_ACTIVE_LIST_ITEM, SET_SIDEBAR_WIDTH } from "./constants";

export const setListItem=(listItem)=>({type:SET_ACTIVE_LIST_ITEM, listItem})
export const setSidebarWidth=(width)=>({type:SET_SIDEBAR_WIDTH, width})