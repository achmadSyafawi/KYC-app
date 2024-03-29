import React from "react";
import { Badge, Button, Col, Row } from "antd";
import { Space, Typography } from "antd";
const { Text, Link } = Typography;

const Result = ({ result }) => {
  return (
    <div>
      <Row>
        <Col xs={8} lg={8}>
          <Text strong>Result</Text>
        </Col>
        <Col xs={8} lg={8} offset={8}>
          <Badge.Ribbon text={result?.status} color="green"></Badge.Ribbon>
        </Col>
      </Row>
      {result !== null
        ? Object.keys(result.read).map((item, idx) => {
            const { confidence, value } = result.read[item];

            return (
              <Row
                key={`idx-${idx}`}
                style={{
                  backgroundColor: `${idx % 2 === 0 ? "lightgray" : "white"}`,
                  paddingLeft: "10px",
                }}
              >
                <Col xs={8} sm={4} md={6} lg={4} xl={10}>
                  {item}
                </Col>
                <Col xs={8} sm={16} md={12} lg={4} xl={4}>
                  {value ? value : "-"}
                </Col>
                <Col xs={8} sm={4} md={6} lg={4} xl={10}>
                  {confidence}
                </Col>
              </Row>
            );
          })
        : null}
    </div>
  );
};

export default Result;
