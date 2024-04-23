import React from "react";
import { Badge } from "antd";

const BadgeContent = ({ result, type }) => {
  if (result !== null && type === "ktp") {
    return (
      <Badge.Ribbon
        text={result?.qualities["is_ktp"] ? "SUCCESS" : "Bukan KTP"}
        color={result?.qualities["is_ktp"] ? "green" : "red"}
      ></Badge.Ribbon>
    );
  }
  return <Badge.Ribbon text={result?.status} color="green"></Badge.Ribbon>;
};

export default BadgeContent;
