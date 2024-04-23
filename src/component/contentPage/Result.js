import React from "react";
import { Col, Row } from "antd";
import { Typography } from "antd";
import BadgeContent from "../common/BadgeContent";
import DetailContent from "../common/DetailContent";
const { Text, Link } = Typography;

const Result = ({ result, type }) => {
  return (
    <>
      <Row>
        <Col xs={8} lg={8}>
          <Text strong>Result</Text>
        </Col>
        <Col xs={8} lg={8} offset={8}>
          <BadgeContent result={result} type={type} />
        </Col>
      </Row>
      <DetailContent result={result} type={type} />
    </>
  );
};

export default Result;
