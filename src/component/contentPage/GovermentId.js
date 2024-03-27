import React, { useState } from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { senApi } from "../utils";

const { Option } = Select;

const GovermentId = ({ handleSetResult, nextStep }) => {
  const [form] = Form.useForm();
  const [imgs, setImgs] = useState([]);
  const [error, setError] = useState(null);

  const onSubmit = async () => {
    const res = await senApi({
      img: imgs,
      type: form.getFieldValue("govermentId"),
    });

    if (res.status === "SUCCESS") {
      handleSetResult(res, imgs);
      nextStep(1);
      setError(null);
    } else {
      setError(res);
    }
  };

  return (
    <div>
      <Form
        // method="POST"
        // target="api/upload/route"
        form={form}
        style={{
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: "10px",
          paddingBottom: "10px",
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
                name="img"
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
              </Form.Item>
            ) : null;
          }}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GovermentId;
