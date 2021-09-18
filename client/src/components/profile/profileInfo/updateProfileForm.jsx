import React, {useState} from "react";
import {Form, Input, InputNumber, Button} from 'antd';
import "../profile.css"
import {profileInfoAPI} from "../../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {setUserProfileInfo} from "../../../store/profileReduser";


export const UpdateProfileForm = ({setEditProfile}) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const onFinish = async (value) => {
    await profileInfoAPI.updateProfileInfo(value, token)
    const profileInfo = await profileInfoAPI.getProfileInfo(token)
    dispatch(setUserProfileInfo(profileInfo))
    await setEditProfile(false)
  }

  return <div className={"updateProfileFormBlock"}>
    <Form className={"updateProfileForm"} name="nest-messages" onFinish={onFinish}>
        <Form.Item  name={['user', 'name']}>
        <div> Name
          <Input placeholder={"Введите свое имя"}/>
        </div>
      </Form.Item>
      <Form.Item name={['user', 'email']}>
        <div> Email
          <Input placeholder={"Введите свою фамилию"}/>
        </div>
      </Form.Item>
      <Form.Item name={['user', 'age']}>
        <div>Age
          <InputNumber placeholder={"Введите свой возраст"} className={"updateProfileForm__inputAge"}/>
        </div>
      </Form.Item>
      <Form.Item name={['user', 'instagram']}>
        <div> Instagram
          <Input placeholder={"Введите свой Instagram"}/>
        </div>
      </Form.Item>
      <Form.Item name={['user', 'aboutMe']}>
        <div> About me
          <Input.TextArea placeholder={"О себе"}/>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={()=>setEditProfile(false)}>cancel</Button>
      </Form.Item>
    </Form>

  </div>
}