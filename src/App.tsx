import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar';
import NewsContainer from './components/News/NewsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeApp } from './redux/app-reducer';
import Preloader from './common/Preloader/Preloader';
import { AppStateType } from './redux/redux-store';
import ChatPage from './components/pages/Chat/ChatPage';

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchToProps = {
  initializeApp: () => void;
};

type PropsType = MapStatePropsType & MapDispatchToProps;

class App extends React.Component<PropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <BrowserRouter>
        <HeaderContainer />
        <div className="wrapper">
          <div className="app__container">
            <Navbar />
            <div className="app_wrapper_content">
              <Routes>
                <Route path="/profile" element={<ProfileContainer />} />

                <Route path="/profile/:userId" element={<ProfileContainer />} />
                <Route path="/news" element={<NewsContainer />} />
                <Route path="/users" element={<UsersContainer />} />
                {/* pageTitle= "cASS" */}
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

function withRouter<WCP>(Children: React.ComponentType<WCP>) {
  return (props: WCP) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

let mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.appPage.initialized,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp }),
  withRouter,
)(App);
