import React from "react";
import { Col, Row } from "antd";
import { camelCaseToWord, underscoreToWord } from "../utils";

const DetailContent = ({ result, type }) => {
  if (result !== null && type === "ktp") {
    if (result?.qualities["is_ktp"]) {
      return (
        <>
          {Object.keys(result.read).map((item, idx) => {
            const { confidence, value } = result.read[item];

            return (
              <Row
                key={`idx-${idx}`}
                style={{
                  backgroundColor: `${idx % 2 === 0 ? "lightgray" : "white"}`,
                  paddingLeft: "10px",
                }}
              >
                <Col xs={8} sm={4} md={6} lg={4} xl={10}>
                  {camelCaseToWord(item)}
                </Col>
                <Col xs={8} sm={16} md={12} lg={4} xl={4}>
                  {value ? value : "-"}
                </Col>
                <Col xs={8} sm={4} md={6} lg={4} xl={10}>
                  {confidence}
                </Col>
              </Row>
            );
          })}
        </>
      );
    }
  }

  if (result !== null && type === "npwp") {
    return (
      <>
        {Object.keys(result.read)
          .reverse()
          .map((item, idx) => {
            const { confidence, value } = result.read[item];

            return (
              <Row
                key={`idx-${idx}`}
                style={{
                  backgroundColor: `${idx % 2 === 0 ? "lightgray" : "white"}`,
                  paddingLeft: "10px",
                }}
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                  lg: 32,
                }}
              >
                <Col className="gutter-row" span={6}>
                  {camelCaseToWord(item)}
                </Col>
                <Col className="gutter-row" span={12}>
                  {value ? value : "-"}
                </Col>
                <Col className="gutter-row" span={6}>{`[${confidence}%]`}</Col>
              </Row>
            );
          })}
      </>
    );
  }

  if (result !== null && type === "kk") {
    const itemRead = Object.keys(result.read.table[0]);
    const itemOrder = [
      "nomor_kk",
      "nama_kepala_keluarga",
      "alamat",
      "rt_rw",
      "kode_pos",
      "desa_kelurahan",
      "kecamatan",
      "kabupaten_kota",
      "provinsi",
      "nomor_blanko",
      // "tanggal_dikeluarkan",
    ];
    const itemTableOrder = [
      "nama_lengkap",
      "nik",
      "agama",
      "golongan_darah",
      "jenis_kelamin",
      "jenis_pekerjaan",
      "kewarganegaraan",
      "nama_ayah",
      "nama_ibu",
      "no",
      "no_kitas_kitap",
      "no_paspor",
      "pendidikan",
      "status_hubungan_dalam_keluarga",
      "status_perkawinan",
      "tanggal_lahir",
      "tanggal_perkawinan",
      "tempat_lahir",
    ];

    return (
      <>
        {itemOrder.map((item, idx) => {
          const { confidence, value } = result.read[item];
          return (
            <Row
              key={`idx-${idx}`}
              style={{
                backgroundColor: `${idx % 2 === 0 ? "lightgray" : "white"}`,
                paddingLeft: "10px",
              }}
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col className="gutter-row" span={6}>
                {underscoreToWord(item)}
              </Col>
              <Col className="gutter-row" span={12}>
                {value ? value : "-"}
              </Col>
              <Col className="gutter-row" span={6}>
                {`[${confidence}%]`}
              </Col>
            </Row>
          );
        })}
        <h2 style={{ textAlign: "left", color: "black" }}>Table :</h2>
        <>
          {result.read.table.map((element, idx) => {
            return (
              <>
                <h3 style={{ color: "black" }}>{`Anggota Keluarga ${
                  idx + 1
                }`}</h3>
                {itemTableOrder.map((item, idx) => {
                  const { confidence, value } = element[item];
                  return (
                    <Row
                      key={`idx-${idx}`}
                      style={{
                        backgroundColor: `${
                          idx % 2 === 0 ? "lightgray" : "white"
                        }`,
                        paddingLeft: "10px",
                      }}
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                      }}
                    >
                      <Col className="gutter-row" span={6}>
                        {underscoreToWord(item)}
                      </Col>
                      <Col className="gutter-row" span={12}>
                        {value ? value : "-"}
                      </Col>
                      <Col className="gutter-row" span={6}>
                        {`[${confidence}%]`}
                      </Col>
                    </Row>
                  );
                })}
              </>
            );
          })}
        </>
      </>
    );
  }

  if (result !== null && type === "sim") {
    return (
      <>
        {Object.keys(result.read).map((item, idx) => {
          const { confidence, value } = result.read[item];

          return (
            <Row
              key={`idx-${idx}`}
              style={{
                backgroundColor: `${idx % 2 === 0 ? "lightgray" : "white"}`,
                paddingLeft: "10px",
              }}
            >
              <Col xs={8} sm={4} md={6} lg={4} xl={10}>
                {underscoreToWord(item)}
              </Col>
              <Col xs={8} sm={16} md={12} lg={4} xl={4}>
                {value ? value : "-"}
              </Col>
              <Col xs={8} sm={4} md={6} lg={4} xl={10}>
                {confidence}
              </Col>
            </Row>
          );
        })}
      </>
    );
  }

  return null;
};

export default DetailContent;
