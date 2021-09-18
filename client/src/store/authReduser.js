
const SET_USER_TOKEN = "SET_USER_TOKEN"
const LOGOUT="LOGOUT"
const SET_USER_DATA="SET_USER_DATA"
let initialState = {
  token: null,
  userId: null,
  userData:null
}


export const authReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TOKEN:
      return {
        ...state, token: action.token
      }
    case LOGOUT:
      return{
        ...state,token:null,userData: null

      }
    case SET_USER_DATA:
      return{
        ...state,userData:action.userData
      }
    default:
      return state
  }
}

export const setUserToken = (token) => {
  return {type: SET_USER_TOKEN, token}
}
export const setUserData=(userData)=>{
  return {type:SET_USER_DATA,userData}
}
export const logout=()=>{
  return {type:LOGOUT}
}
