import React, { useState } from "react";
import Image from "next/image";
import { Alert, Button, Col, Form, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
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
      setIsLoading(false);
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
            paddingRight: "10px",
          }}
          layout="vertical"
          onFinish={onSubmit}
        >
          {error ? <Alert type="error" description={error.error} /> : null}
          <Form.Item
            name="govermentId"
            label="Goverment Id"
            rules={[{ required: true, message: "Goverment ID is Required" }]}
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
                    className="ant-upload ant-upload-select"
                    type="file"
                    onChange={(e) => setImgs(e.target.files?.[0])}
                  ></input>

                  {imgs ? (
                    <Image
                      src={`${URL.createObjectURL(imgs)}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        paddingTop: "5px",
                      }}
                      width={400}
                      height={300}
                      alt="Picture upload"
                    />
                  ) : null}
                </Form.Item>
              ) : null;
            }}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isLoading} block>
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
