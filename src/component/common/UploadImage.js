import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";

const UploadImage = ({ handleUpload, isUpload }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUploadImage = () => {
    handleUpload(fileList);
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },

    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUploadImage}
        disabled={fileList.length === 0}
        loading={isUpload}
        style={{
          marginTop: 16,
        }}
      >
        {isUpload ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
};
export default UploadImage;
