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
  data.set("file", img);
  data.set("type", type);
  const config = {
    method: "POST",
    headers: {
      Authorization: basicAuth,
      "x-api-key": apiKey,
    },
    body: data,
  };

  const response = await fetch("/api/upload/route", { ...config });
  return response.json();
};
