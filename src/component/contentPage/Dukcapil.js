import React, { useEffect } from "react";
import { Button, Spin } from "antd";

const Dukcapil = ({ nextStep }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      nextStep();
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div>
      <h2>Comparing data with Dukcapil</h2>

      <Spin />
      <h3>Loading...</h3>
    </div>
  );
};

export default Dukcapil;
