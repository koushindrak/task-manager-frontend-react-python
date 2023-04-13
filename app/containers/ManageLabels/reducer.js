/*
 *
 * Labels reducer
 *
 */


import { fromJS } from 'immutable';

export const initialState = fromJS({});
import * as CONSTANTS from './constants'

function manageLabelsReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.CREATE_LABEL_SUCCESS:
      return Object.assign({},state,{createLabelResponse:action.response})

    case CONSTANTS.CREATE_LABEL_FAILURE:
      return Object.assign({},state, {createLabelError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_LABELS_SUCCESS:
      return Object.assign({},state,{getLabelResponse:action.response})

    case CONSTANTS.GET_LABELS_FAILURE:
      return Object.assign({},state, {getLabelError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.GET_LABEL_BY_ID_SUCCESS:
      return Object.assign({},state,{getLabelByIdResponse:action.response})

    case CONSTANTS.GET_LABEL_BY_ID_FAILURE:
      return Object.assign({},state, {getLabelByIdError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.UPDATE_LABEL_SUCCESS:
      return Object.assign({},state,{updateLabelResponse:action.response})

    case CONSTANTS.UPDATE_LABEL_FAILURE:
      return Object.assign({},state, {updateLabelError:{error:action.error,errorTime:new Date()}})

    case CONSTANTS.DELETE_LABEL_SUCCESS:
      return Object.assign({},state,{deleteLabelResponse:action.response})

    case CONSTANTS.DELETE_LABEL_FAILURE:
      return Object.assign({},state, {deleteLabelError:{error:action.error,errorTime:new Date()}})

    default:
      return state;
  }
}

export default manageLabelsReducer;
