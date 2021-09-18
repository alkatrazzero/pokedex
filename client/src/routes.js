import {Link, Redirect, Route, Switch, useLocation} from "react-router-dom";
import {FavoritePokemons} from "./components/RenderPokemons/FavoritePokemons";
import BodyContainer from "./components/BodyContainer";
import {TierListPokemons} from "./components/tierListPokemons/tierList";
import React from "react";
import {Button, Col, Dropdown, Layout, Menu, Row} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import AuthPage from "./components/auth/AuthPage";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "./store/authReduser";
import {setAllFavoritePokemons} from "./store/pokemonsReduser";
import Profile from "./components/profile/profile";
import {setUserProfileInfo} from "./store/profileReduser";
import {DownOutlined} from "@ant-design/icons";

const UseRoutes = () => {
  // {/*<span className={"headerMenu__userDataItem"} style={{color: "white"}}>{userData}</span>*/}
  // {/*<Button onClick={logoutDispatch}>Logout</Button>*/}

  const dispatch = useDispatch()
  const logoutDispatch = async () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('userEmail')
    dispatch(setAllFavoritePokemons([]))
    dispatch(logout())
    dispatch(setUserProfileInfo([]))
  }
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a onClick={logoutDispatch} href="">Logout</a>
      </Menu.Item>
    </Menu>
  );
  const userData = useSelector(state => state.auth.userData)
  const isAuth = useSelector(state => state.auth.token)
  const params = useLocation()


  if (!!isAuth) {
    return <Layout className={"layoutWrapper"}>

      <Header className="header">
        <div className="logo"/>
        <Row className={"headerMenu"} gutter={24}>
          <Col span={16}>
            <Menu theme="dark" mode="horizontal" selectedKeys={[params.pathname || "/MyProfile"]}>
              <Menu.Item  key="/MyProfile"><Link to={"/MyProfile"}>My profile</Link></Menu.Item>
              <Menu.Item key="/pokemons"><Link to={"/pokemons"}>All Pokemons</Link></Menu.Item>
              <Menu.Item key="/FavoritePokemons"><Link to={"/FavoritePokemons"}>Favorite Pokemons</Link></Menu.Item>
              <Menu.Item key="/PokemonsTierList"><Link to={"/PokemonsTierList"}> Pokemons tier list</Link></Menu.Item>
            </Menu>
          </Col>
          <Col className={"headerMenu__column"} span={8}>
            <div>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  {userData} <DownOutlined />
                </a>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Header>


      <Layout>
        <Layout >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path={"/MyProfile"} render={() => <Profile/>}/>
              <Route exact path={"/FavoritePokemons"} render={() => <FavoritePokemons/>}/>
              <Route exact path={"/pokemons"} render={() => <BodyContainer/>}/>
              <Route exact path={"/PokemonsTierList"} render={() => <TierListPokemons/>}/>
              <Redirect to={"/MyProfile"}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
      <Footer style={{textAlign: 'center'}}>Pokemons ©2021 Created by Vibranovsky Mark</Footer>
    </Layout>
  }
  return <AuthPage/>
}

export default UseRoutes



