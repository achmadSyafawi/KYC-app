import { NextRequest, NextResponse } from "next/server";
import { Vision } from "@glair/vision";
import { join } from "path";
import { writeFile } from "fs/promises";
import { readFileSync } from "fs";

const apiKey1 = process.env.NEXT_PUBLIC_API_KEY;
const username = process.env.NEXT_PUBLIC_API_UNAME;
const password = process.env.NEXT_PUBLIC_API_PASS;

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const sendToGlair = async (path, url, config) => {
  try {
    const res = await fetch(url, config);

    if (res.status === 200) {
      return res;
    } else {
      return res;
    }
  } catch (err) {
    console.log("ERR::", err);
    return err;
  }
};

export async function POST(request) {
  const data = await request.formData();
  const type = data.get("type");
  const file = data.get("file");
  let url = "";

  if (type === "ktp") {
    url = `${BASE_URL}ocr/v1/ktp/qualities`;
  } else if (type === "npwp") {
    url = `${BASE_URL}ocr/v1/npwp`;
  } else if (type === "sim") {
    url = `${BASE_URL}ocr/v1/kk`;
  } else {
    url = `${BASE_URL}ocr/v1/sim`;
  }

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = join("/Users/achmadsyifausyafawi/Documents/KYC/", "test.png");

  await writeFile(path, buffer).then((res) => {
    console.log("rampung!!::", res);
  });

  const newReqData = new FormData();
  newReqData.set("image", new Blob([readFileSync(`${path}`)]));

  const config = {
    method: "POST",
    headers: {
      Authorization: request.headers.get("Authorization"),
      "x-api-key": request.headers.get("x-api-key"),
    },
    body: newReqData,
  };

  try {
    const response = await sendToGlair(path, url, config);

    const responseData = await response.json();

    return NextResponse.json({ ...responseData });
  } catch (error) {
    return NextResponse.json({
      error: "coba cek kembali foto anda",
      success: false,
    });
  }
}
