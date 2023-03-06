import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../redux/redux-store';


let mapStateToPropsForNavigate = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
} as MapPropsType);

type MapPropsType = {
  isAuth: boolean
}
type DispatchPropsType = {
}

export function withAuthNavigate<WCP>(WrappedComponent: React.ComponentType) {

  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
      let {isAuth, ...restProps} = props

      if (!isAuth) return <Navigate to='/login'/>

      return <WrappedComponent {...restProps }/>
  }

  let AuthNavigateComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
    mapStateToPropsForNavigate, {})
  (RedirectComponent)

  return AuthNavigateComponent;
}