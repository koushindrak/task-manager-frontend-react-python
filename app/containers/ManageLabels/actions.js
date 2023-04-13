/*
 *
 * Labels actions
 *
 */

import * as CONSTANTS from './constants';

export function createLabel(payload) {
  return {
    type: CONSTANTS.CREATE_LABEL,
    payload
  }
}

export function getLabels() {
  return{
    type: CONSTANTS.GET_LABELS
  }
}
export function getLabelById(id) {
  return {
    type: CONSTANTS.GET_LABEL_BY_ID,
    id
  }
}
export function updateLabel(payload) {
  return {
    type: CONSTANTS.UPDATE_LABEL,
    payload
  }
}
export function deleteLabel(id) {
  return {
    type: CONSTANTS.DELETE_LABEL,
    id
  }
}
