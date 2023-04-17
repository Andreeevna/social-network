import React from "react";

import { Users } from "./Users";
import Preloader from "../../common/Preloader/Preloader";
import { compose } from "redux";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import {getIsFetching} from "../../redux/users-selectors";
import { useSelector } from "react-redux";

type PropsType = {
  pageTitle: string;
};

const UsersContainerAPI: React.FC<PropsType> = (props) => {

  const isFetching = useSelector(getIsFetching);

  return (
    <>
      {/* <h2>{props.pageTitle}</h2> */}
      <div>{isFetching ? <Preloader /> : null}</div>
      <Users />
    </>
  );
};

export default compose<React.ComponentType>(withAuthNavigate)(
  UsersContainerAPI
);
