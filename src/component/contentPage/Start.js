import React from "react";
import { Button } from "antd";

const Start = ({ nextStep }) => {
  return (
    <div>
      <h2>Getting Started</h2>
      <Button onClick={nextStep}>Begin Verification</Button>
    </div>
  );
};

export default Start;
