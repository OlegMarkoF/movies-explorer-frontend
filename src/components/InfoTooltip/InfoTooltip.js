import React from "react";
import "./InfoTooltip.css";
import close from "../../images/Close.svg";

function InfoTooltip({ isOpen, onClose, notification }) {
  return (
    <div className={isOpen ? `info info_opened info_tip` : `info info_tip`}>
      <div className="info__box">
        <button
          className="info__close-button"
          onClick={onClose}
          type="button"
        ><img className="info__close" src={close} alt="закрыть попап" /></button>
        <p className="info__notification">{notification.text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
