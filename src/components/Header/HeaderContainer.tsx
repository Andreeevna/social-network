import React from "react";
import { connect } from "react-redux";

import Header from "./Header";
import { actions, Logout } from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";
import { activeNav } from "../../redux/nav-reducer";

const setData = actions.setData;

export type MapStatePropsType = {
  isAuth: boolean | null,
  login: string | null,
  isActive: boolean | undefined
};

export type MapDispatchToPropsType = {
  activeNav?: () => void,
  disactiveNav?: () => void,
  Logout: () => void,
};

class HeaderContainer extends React.Component<MapStatePropsType & MapDispatchToPropsType> {
  render() {
    return (
      <Header {...this.props} />
    );
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    isActive: state.nav.isActive
  };
};

export default connect<MapStatePropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, { Logout, activeNav })(HeaderContainer);
