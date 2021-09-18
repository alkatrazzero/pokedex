import React, {useEffect, useState} from 'react'
import {Button} from "antd";
import {useDispatch} from "react-redux";
import {setUserData, setUserToken} from "../../store/authReduser";

export const GoogleLogin = () => {
const [currentProfile,setCurrentProfile]=  useState(null)
  const dispatch=useDispatch()
  const setTokenDispatch=(token,userData)=>{
    dispatch(setUserToken(token),
    dispatch(setUserData(userData)))}
  useEffect(() => {
    const _onInit = auth2 => {
      console.log('init OK', auth2)
    }
    const _onError = err => {
      console.log('error', err)
    }
    // window.gapi.load('auth2', function () {
    //   window.gapi.auth2
    //     .init({
    //       client_id:"1052136307223-b3a1bkm5gnba6o7ds8e22qplq7en5o3f.apps.googleusercontent.com"
    //     })
    //     .then(_onInit, _onError)
    // })

  }, [])
  const signIn = () => {
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signIn().then(googleUser => {

      // метод возвращает объект пользователя
      // где есть все необходимые нам поля
      const profile = googleUser.getBasicProfile()
      setCurrentProfile(profile)
      console.log(profile)
      console.log('ID: ' + profile.getId()) // не посылайте подобную информацию напрямую, на ваш сервер!
      console.log('Full Name: ' + profile.getName())
      // console.log('Given Name: ' + profile.getGivenName())
      // console.log('Family Name: ' + profile.getFamilyName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())

      // токен
      const id_token = googleUser.getAuthResponse().id_token
      setTokenDispatch(id_token,profile.getEmail())
      console.log('ID Token: ' + id_token)
    })
  }
  const signOut = () => {
  setCurrentProfile(null)
    const auth2 = window.gapi.auth2.getAuthInstance()
    auth2.signOut().then(function() {
    })
  }

  return <div>
    {!currentProfile? <Button onClick={signIn}>Login with Google</Button>:
  <Button onClick={signOut}>Log out</Button>}
  </div>
}