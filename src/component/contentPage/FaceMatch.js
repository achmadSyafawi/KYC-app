import React, { useState } from "react";
import Image from "next/image";
import { Button, Col, Form, Row } from "antd";
import { faceVerification } from "../utils";

const FaceMatch = ({ img, handleFaceVerif, scanImgData }) => {
  const [form] = Form.useForm();
  const [captureImage, setCaptureImage] = useState(null);

  const onSubmit = async () => {
    const { nik, nama, tanggalLahir } = scanImgData.read || {};

    const res = await faceVerification({
      captureImage,
      nik: nik.value,
      name: nama.value,
      dateOfBirth: tanggalLahir.value,
    });

    handleFaceVerif(res);
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
          <Form.Item
            label="Upload Image"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <input
              type="file"
              onChange={(e) => setCaptureImage(e.target.files?.[0])}
            ></input>
            {captureImage ? (
              <Image
                src={`${URL.createObjectURL(captureImage)}`}
                width={250}
                height={250}
                alt="Picture upload"
              />
            ) : null}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              disabled={captureImage === null}
            >
              Compare
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col xs={24} lg={12}>
        <Image
          src={`${URL.createObjectURL(img)}`}
          width={250}
          height={250}
          alt="Picture upload"
        />
      </Col>
    </Row>
  );
};

export default FaceMatch;
