import { readFileSync } from "fs";
import { Vision } from "@glair/vision";

const apiKey1 = process.env.NEXT_PUBLIC_API_KEY;
const username = process.env.NEXT_PUBLIC_TOKEN_UNAME;
const password = process.env.NEXT_PUBLIC_TOKEN_PASS;

export const senApi = async ({ img, type }) => {
  const basicAuth =
    "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
  const apiKey = apiKey1;
  const data = new FormData();
  let url = "";
  // data.set("file", img);
  // data.set("type", type);
  data.set("image", img);
  const config = {
    method: "POST",
    headers: {
      Authorization: basicAuth,
      "x-api-key": apiKey,
    },
    body: data,
  };

  if (type === "ktp") {
    url = `/ocr/v1/ktp`;
  } else if (type === "npwp") {
    url = `/ocr/v1/npwp`;
  } else if (type === "sim") {
    url = `/ocr/v1/kk`;
  } else {
    url = `/ocr/v1/sim`;
  }

  try {
    const response = await fetch(url, config);
    const responseData = await response.json();

    // console.log(responseData);

    return responseData;
  } catch (err) {
    return { success: false, errMsg: err.message };
  }
};
