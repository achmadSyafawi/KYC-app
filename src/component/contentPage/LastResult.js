import React from "react";
import { Button, Col, Row } from "antd";
import Image from "next/image";

const LastResult = ({ result, img }) => {
  return (
    <Row gutter={[8, 16]}>
      <Col lg={12} xs={24}>
        <Image
          src={`${URL.createObjectURL(img)}`}
          width={200}
          height={200}
          alt="Picture of the author"
        />
      </Col>
      <Col lg={12} xs={24}>
        {Object.keys(result.read).map((item, idx) => {
          const { confidence, value } = result.read[item];
          return (
            <Row
              key={`idx-${idx}`}
              style={{
                backgroundColor: `${idx % 2 === 0 ? "lightgray" : "white"}`,
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
      </Col>
    </Row>
  );
};

export default LastResult;
