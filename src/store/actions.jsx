
import { ADD_USER, UPDATE_USER,DELETE_USER } from './actionType';


export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});


export const updateuser = (playerId, updatedPlayer) => ({
  type: UPDATE_USER,
  payload: { playerId, updatedPlayer },
});


export const deleteuser = (playerId) => ({
  type: DELETE_USER,
  payload: playerId,
});
