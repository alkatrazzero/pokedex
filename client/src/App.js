import './App.css';
import React, {useEffect} from "react"
import UseRoutes from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {getAllFavoritePokemons} from "./store/pokemonsReduser";
import {setUserData, setUserToken} from "./store/authReduser";

const App = (props) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'))
    const email=JSON.parse(localStorage.getItem('userEmail'))
    if (data) {
      dispatch(setUserToken(data))
      dispatch(setUserData(email))
    }
  }, [setUserToken])
  useEffect(() => {
    dispatch(getAllFavoritePokemons(token))
  }, [token])

  return <div>
    <UseRoutes/>
  </div>
}

export default App;