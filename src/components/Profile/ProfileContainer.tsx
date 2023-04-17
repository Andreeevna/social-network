import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { actions } from "../../redux/profile-reducer";
import { getUserProfile, getStatusProfile, updateStatusProfile, savePhoto, saveProfile } from "../../redux/profile-reducer";
import { Params, useParams } from "react-router-dom";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";


type MapStatePropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
  getUserProfile: (userId: number | null) => void,
  getStatusProfile: (userId: number | null) => void,
  updateStatusProfile: (status: string) => void,
  savePhoto: (file: File) => void,
  saveProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
  params: Params,
  match: { params: Params },
  userId: string,
  history: {
    push(url: string): void;
  }
}

type AllPropsType = MapStatePropsType & MapDispatchToPropsType & PathParamsType

const setProfile = actions.setProfile;

class ProfileContainerAPI extends React.Component<AllPropsType>   {

  refreshProfile() {
    let userId: number | null = Number(this.props.match.params.userId);
    if (!userId) {
      userId = this.props.autorizedId;
      if (!userId) {
        this.props.history.push('/login');
      }
    }

    this.props.getUserProfile(userId)
    this.props.getStatusProfile(userId)
  }

  componentDidMount() {
    // debugger
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: AllPropsType, prevState: AllPropsType) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile();
    }

  }

  render() {

    return <Profile
      {...this.props}
      isOwner={!this.props.match.params.userId}
      profile={this.props.profile}
      getUserProfile={this.props.getUserProfile}
      status={this.props.status}
      updateStatusProfile={this.props.updateStatusProfile}
      savePhoto={this.props.savePhoto}
      saveProfile={this.props.saveProfile}
    />;
  }
}

let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedId: state.auth.id,
    isAuth: state.auth.isAuth,

  };
};

function withRouter<P extends PathParamsType>(Children: React.ComponentType<P>) {
  return (props: P) => {

    const match = { params: useParams() };
    return <Children {...props as P} match={match} />
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    setProfile,
    getUserProfile,
    getStatusProfile,
    updateStatusProfile,
    savePhoto,
    saveProfile
  }),
  withRouter,
  withAuthNavigate
)(ProfileContainerAPI)
