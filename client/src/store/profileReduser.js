import {pokemonsAPI} from "../api/api";
import {addNewFavoritePokemon} from "./pokemonsReduser";

const SET_USER_PROFILE_INFO = "SET_USER_PROFILE_INFO"
let initialState = {
  profileInfo: [],

}


export const profileReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_PROFILE_INFO:
      return {
        ...state, profileInfo: action.profileInfo
      }
    default:
      return state
  }
}

export const setUserProfileInfo = (profileInfo) => {
  return {type: SET_USER_PROFILE_INFO, profileInfo}
}

