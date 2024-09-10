import React, { useState } from "react";
import './Status.css';

export const Status = ({onUnMember,onIndependent}) => {
  const [unMember, setUnMember] = useState(false);
  const [independent, setIndependent] = useState(false);

  const checkClick = (id) => {
    if (id === 1) {
      setUnMember(!unMember);
      onUnMember(unMember)
    } else {
      setIndependent(!independent);
      onIndependent(independent)
    }
  };

  return (
    <div className="sub_status">
      <p>Status</p>
      <div className="status_checkboxes">
        <div className="checkboxes_checkbox">
          <span
            onClick={() => checkClick(1)}
            className={unMember ? "checkmarkClicked" : "checkmark"}
          ></span>
          <span
            onClick={() => checkClick(1)}
            className={unMember ? "backgroundCheck" : "backgroundHide"}
          ></span>
          <p>Member of the United Nations</p>
        </div>
        <div className="checkboxes_checkbox">
          <span
            onClick={() => checkClick(2)}
            className={independent ? "checkmarkClicked" : "checkmark"}
          ></span>
          <span
            onClick={() => checkClick(2)}
            className={independent ? "backgroundCheck" : "backgroundHide"}
          ></span>
          <p>Independent</p>
        </div>
      </div>
    </div>
  );
};
