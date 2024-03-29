import React from "react";
import { Button, Col, Row } from "antd";
import Image from "next/image";

const LastResult = ({ resultFaceVerif, resultScanImg, err }) => {
  const renderContent = () => {
    if (resultFaceVerif !== null) {
      if (resultFaceVerif["verification_status"] === true) {
        return (
          <div>{`Sukses ${resultScanImg.read.nama.value} telah terkonfirmasi`}</div>
        );
      } else {
        return <div>{resultFaceVerif.reason}</div>;
      }
    } else {
      return <div>Something when wrong!!</div>;
    }
  };
  return <div>{renderContent()}</div>;
};

export default LastResult;
