import React from "react";
import {
  NotificationMsgDiv,
  NotificationMsgPara,
} from "./FormNotification.elements";

const FormNotification = ({ dataSavedSuccess, dataSavedError }) => {
  return (
    <>
      {dataSavedSuccess && (
        <NotificationMsgDiv success={true}>
          <NotificationMsgPara>Data Saved Successfully .</NotificationMsgPara>
        </NotificationMsgDiv>
      )}

      {dataSavedError && (
        <NotificationMsgDiv success={false}>
          <NotificationMsgPara>
            Found Invalid Data. Please fill correctly !
          </NotificationMsgPara>
        </NotificationMsgDiv>
      )}
    </>
  );
};

export default FormNotification;
