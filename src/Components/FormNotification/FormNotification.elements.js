import styled from "styled-components";

export const NotificationMsgDiv = styled.div`
  background-color: ${({ success }) =>
    success ? "rgb(186, 230, 126)" : "rgb(230, 114, 115)"};
  border-radius: 21px;
  padding: 4px;
  display: inline-block;
  position: sticky;
  z-index: 50;
  font-size: 80%;
  text-align: center;
  margin-bottom: 8px;
  transition: 0.25s all ease-in-out;

  @media (min-width: 970px) {
    font-size: 80%;
  }

  @media (min-width: 700px) and (max-width: 969px) {
    font-size: 70%;
  }

  @media (min-width: 600px) and (max-width: 699px) {
    font-size: 60%;
  }

  @media (min-width: 500px) and (max-width: 599px) {
    font-size: 50%;
  }
  @media (min-width: 360px) and (max-width: 499px) {
    font-size: 40%;
  }

  @media (min-width: 200px) and (max-width: 359px) {
    font-size: 25%;
  }
`;

export const NotificationMsgPara = styled.p`
  color: #fff;
  margin-top: 0;
  margin-bottom: 0;
  @media (min-width: 970px) {
    padding: 10px;
  }

  @media (min-width: 700px) and (max-width: 969px) {
    padding: 8px;
  }

  @media (min-width: 600px) and (max-width: 699px) {
    padding: 6px;
  }

  @media (min-width: 500px) and (max-width: 599px) {
    padding: 4px;
  }
  @media (min-width: 360px) and (max-width: 499px) {
    padding: 2px;
  }

  @media (min-width: 200px) and (max-width: 359px) {
    padding: 1px;
  }
`;
