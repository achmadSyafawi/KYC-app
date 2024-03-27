"use client";

import React, { useState } from "react";
import { Button, Flex, message, Steps, theme } from "antd";
import Start from "@/component/contentPage/Start";
import GovermentId from "@/component/contentPage/GovermentId";
import LastResult from "@/component/contentPage/LastResult";
const steps = [
  {
    key: "start",
    title: "Start",
    content: "Start",
  },
  {
    key: "govid",
    title: "Goverment ID verification",
    content: "Goverment-id-verification",
  },
  {
    key: "success",
    title: "Success",
    content: "success",
  },
];
const Home = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState([]);
  const [img, setImg] = useState(null);

  const next = (i) => {
    if (i > 0) {
      setCurrent(current + i);
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSetResult = (res, img) => {
    setResult(res);
    setImg(img);
    next();
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "100px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const content = () => {
    if (steps[current].key === "start") {
      return <Start nextStep={next} />;
    }

    if (steps[current].key === "govid") {
      return <GovermentId handleSetResult={handleSetResult} nextStep={next} />;
    }

    if (steps[current].key === "success") {
      return <LastResult result={result} img={img} />;
    }
  };

  return (
    <Flex gap="middle" justify="center" vertical style={{ margin: "10%" }}>
      <Steps current={current} items={items} />

      <div style={contentStyle}>{content()}</div>

      {/* button */}
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </Flex>
  );
};
export default Home;
