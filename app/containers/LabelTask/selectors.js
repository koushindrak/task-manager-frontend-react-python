import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectManageTasksDomain = state => state.get('manageTasks', initialState);

export const createTaskSuccess=()=> createSelector(selectManageTasksDomain,substate=>substate.createTaskResponse)
export const createTaskFailure=()=> createSelector(selectManageTasksDomain,substate=>substate.createTaskError)

export const getTaskSuccess=()=> createSelector(selectManageTasksDomain,substate=>substate.getTaskResponse)
export const getTaskFailure=()=> createSelector(selectManageTasksDomain,substate=>substate.getTaskError)

export const getTaskByIdSuccess=()=> createSelector(selectManageTasksDomain,substate=>substate.getTaskByIdResponse)
export const getTaskByIdFailure=()=> createSelector(selectManageTasksDomain,substate=>substate.getTaskByIdError)

export const updateTaskSuccess=()=> createSelector(selectManageTasksDomain,substate=>substate.updateTaskResponse)
export const updateTaskFailure=()=> createSelector(selectManageTasksDomain,substate=>substate.updateTaskError)

export const deleteTaskSuccess=()=> createSelector(selectManageTasksDomain,substate=>substate.deleteTaskResponse)
export const deleteTaskFailure=()=> createSelector(selectManageTasksDomain,substate=>substate.deleteTaskError)

export { selectManageTasksDomain };
