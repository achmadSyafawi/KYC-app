"use client";

import React, { useState } from "react";
import { Button, Flex, Layout, message, Steps, theme } from "antd";
import Start from "@/component/contentPage/Start";
import GovermentId from "@/component/contentPage/GovermentId";
import LastResult from "@/component/contentPage/LastResult";
import FaceMatch from "../component/contentPage/FaceMatch";
import Dukcapil from "../component/contentPage/Dukcapil";
const { Header, Content, Footer } = Layout;
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
    key: "facematch",
    title: "Face Match",
    content: "Face Match",
  },
  {
    key: "dukcapil",
    title: "DUKCAPIL",
  },
  {
    key: "success",
    title: "Success",
    content: "success",
  },
];

const style = {
  contentContainer: {
    backgroundColor: "white",
    padding: "24px",
  },
  content: {
    padding: "48px 48px",
  },
};
const Home = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [result, setResult] = useState([]);
  const [img, setImg] = useState(null);
  const [faceVerifResult, setFaceVerifResult] = useState(null);
  const [err, setErr] = useState(null);

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
  };

  const handleSetFaceVerifResult = (res) => {
    if (res["verification_status"] === true) {
      setFaceVerifResult(res);
    } else {
      setErr(err);
    }
    next();
  };

  const isDisable = () => {
    if (steps[current].key === "start") {
      return false;
    }

    if (steps[current].key === "govid") {
      return result.length <= 0;
    }

    return false;
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "38px",
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

    if (steps[current].key === "facematch") {
      return (
        <FaceMatch
          img={img}
          handleFaceVerif={handleSetFaceVerifResult}
          scanImgData={result}
          nextStep={next}
        />
      );
    }

    if (steps[current].key === "dukcapil") {
      return <Dukcapil nextStep={next} />;
    }

    if (steps[current].key === "success") {
      return (
        <LastResult
          resultFaceVerif={faceVerifResult}
          resultScanImg={result}
          err={err}
        />
      );
    }
  };

  console.log("result::", result.length <= 0);

  return (
    <Layout>
      <Header></Header>
      <Content style={{ ...style.content }}>
        <Flex
          gap="middle"
          justify="center"
          vertical
          style={{ ...style.contentContainer }}
        >
          <Steps current={current} items={items} />

          <div style={contentStyle}>{content()}</div>

          <div
            style={{
              marginTop: 24,
            }}
          >
            {current < steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => next()}
                disabled={isDisable()}
              >
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
      </Content>
      <Footer></Footer>
    </Layout>
  );
};
export default Home;
