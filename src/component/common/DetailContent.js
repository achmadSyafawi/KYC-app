import { Col, Row } from "antd";
import React from "react";

const DetailContent = ({ result, type }) => {
  if (result !== null && type === "ktp") {
    if (result?.qualities["is_ktp"]) {
      return (
        <>
          {Object.keys(result.read).map((item, idx) => {
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
          })}
        </>
      );
    }
  }

  if (result !== null && type !== "ktp") {
    return (
      <>
        {Object.keys(result.read).map((item, idx) => {
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
        })}
      </>
    );
  }

  return null;
};

export default DetailContent;
