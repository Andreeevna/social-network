import React, { useEffect } from "react";
import Paginator from "../../common/Preloader/Paginator";
import User from "./User";
import s from "./Users.module.css";
import { UsersSearchForm } from "./UsersSearchForm";
import {
  FilterType,
  followUsers,
  getUsersT,
  unfollowUsers,
} from "../../redux/users-reducer";
import { useSelector } from "react-redux";
import {
  getCurrentPage,
  getPageSize,
  getTotalUsersCount,
  getUsersSelect,
} from "../../redux/dist/users-selectors";
import { useDispatch } from "react-redux";
import {
  getFilter,
  getFollowingInProgress,
  getPortionSize,
} from "../../redux/users-selectors";
import { UsersType } from "../../types/types";
import store from "../../redux/redux-store";
import { useLocation, useNavigate } from "react-router-dom";


type PropsType = {};
type QueryParamsType = { term?: string; page?: string; friend?: string }

export type TypedDispatch = typeof store.dispatch;

export const Users: React.FC<PropsType> = () => {

  const totalCount = useSelector(getTotalUsersCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getFilter);
  const users = useSelector(getUsersSelect);
  const followingInProgress = useSelector(getFollowingInProgress);
  const portionSize = useSelector(getPortionSize);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const termParsed = query.get('term')
    const pageParsed = query.get('page')
    const friendParsed = query.get('friend')

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!pageParsed) actualPage = Number(pageParsed);
    if (!!termParsed) actualFilter = { ...actualFilter, term: termParsed as string };

    switch (friendParsed) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    //@ts-ignore
    dispatch(getUsersT(pageSize, actualPage, actualFilter));
    // debugger;
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)


    navigate({
      pathname: "/users",
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    })
  }, [filter, currentPage])

  const onChanged = (number: number) => {
    //@ts-ignore
    dispatch(getUsersT(pageSize, number, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    //@ts-ignore
    dispatch(getUsersT(pageSize, 1, filter));
  };

  const followUsers1 = (userId: number) => {
    //@ts-ignore
    dispatch(followUsers(userId));
  };

  const unfollowUsers1 = (userId: number) => {
    //@ts-ignore
    dispatch(unfollowUsers(userId));
  };

  return (
    <div className={s.users}>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <div className={s.users__container}>
        {users.map((u: UsersType) => (
          <User
            key={u.id}
            u={u}
            followingInProgress={followingInProgress}
            followUsers1={followUsers1}
            unfollowUsers1={unfollowUsers1}
          />
        ))}
      </div>
      <Paginator
        totalCount={totalCount}
        currentPage={currentPage}
        onChanged={onChanged}
        pageSize={pageSize}
        portionSize={portionSize}
      />
    </div>
  );
};
