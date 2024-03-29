import React, { useState } from "react";
import Image from "next/image";
import { Button, Col, Form, Row, Select } from "antd";
import { senApi } from "../utils";
import Result from "./Result";

const { Option } = Select;

const GovermentId = ({ handleSetResult, nextStep }) => {
  const [form] = Form.useForm();
  const [imgs, setImgs] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const onSubmit = async () => {
    setIsLoading(true);
    const res = await senApi({
      img: imgs,
      type: form.getFieldValue("govermentId"),
    });

    if (res.status === "SUCCESS") {
      setResultData(res);
      handleSetResult(res, imgs);
      setIsLoading(false);
      setError(null);
    } else {
      setError(res);
    }
  };

  return (
    <Row gutter={16}>
      <Col xs={24} lg={12}>
        <Form
          form={form}
          style={{
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
            paddingTop: "10px",
            paddingBottom: "10px",
            paddingLeft: "10px",
          }}
          layout="vertical"
          onFinish={onSubmit}
        >
          {error ? <div>{error.error}</div> : null}
          <Form.Item
            name="govermentId"
            label="Goverment Id"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select government ID to verify your identity"
              allowClear
            >
              <Option value="ktp">KTP</Option>
              <Option value="npwp">NPWP</Option>
              <Option value="sim">SIM</Option>
              <Option value="kk">KK</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.govermentId !== currentValues.govermentId
            }
          >
            {({ getFieldValue }) => {
              return getFieldValue("govermentId") ? (
                <Form.Item
                  // name="img"
                  label="Upload Image"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <input
                    type="file"
                    onChange={(e) => setImgs(e.target.files?.[0])}
                  ></input>
                  {imgs ? (
                    <Image
                      src={`${URL.createObjectURL(imgs)}`}
                      width={250}
                      height={250}
                      alt="Picture upload"
                    />
                  ) : null}
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              {!isLoading ? "Scan" : "Loading"}
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={24} lg={12}>
        <Result result={resultData} />
      </Col>
    </Row>
  );
};

export default GovermentId;
