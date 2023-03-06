import React, { ChangeEvent, useEffect, useState } from 'react';
import s from './ProfileStatus.module.css';

type PropsType = {
  status: string;
  updateStatusProfile: (status: string) => void;
};

const ProfileStatus: React.FC<PropsType> = (props) => {
  let [editeMode, setEditeMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditeMode = () => {
    setEditeMode(true);
  };

  const deActivateEditeMode = () => {
    setEditeMode(false);
    props.updateStatusProfile(status);
  };

  const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <>
      {!editeMode && (
        <span className={s.status__edite} onDoubleClick={activateEditeMode}>
          {props.status || '------'}
        </span>
      )}
      {editeMode && (
        <input
          className={s.status__input}
          onBlur={deActivateEditeMode}
          autoFocus={true}
          value={status}
          onChange={onChangeStatus}
        />
      )}
    </>
  );
};

export default ProfileStatus;
