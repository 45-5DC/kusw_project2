import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import ColumnChart from "./components/chart";
import Rowbar from "./components/rowBar";
import CountUp from "react-countup";
import "./App.css";

const App = () => {
  const [file, setFile] = useState({});
  const [prob, setProb] = useState(null);
  const [value, setValue] = useState(0);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFile) => {
      console.log(acceptedFile);
      setFile(
        Object.assign(acceptedFile[0], {
          preview: URL.createObjectURL(acceptedFile[0]),
        })
      );

      const formData = new FormData();
      formData.append("file", acceptedFile[0]);
      fetch("http://localhost:5000/detect", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(
          (data) => {
            setProb(data);
          }
          // setProb(Math.round(parseFloat(data.prop) * 1000) / 1000)
        );
      console.log(prob);
    },
  });
  const image = (
    <img
      className="image"
      key={file.name}
      src={file.preview}
      alt="image"
      width={file.width}
      height={file.height}
      style={{
        marginTop: "20px",
      }}
    />
  );

  return (
    <div className="main">
      <div className="dropArea" {...getRootProps()}>
        <input {...getInputProps()} />
        <p className="text">Drag and Drop Here</p>
      </div>
      <div className="context">
        {prob && image}
        {prob && <p style={{ textAlign: "center" }}>생성되었을 확률</p>}
        {/* {prob && (
          <p className="percent">
            {Math.round(parseFloat(prob.result) * 10000) / 100} %
          </p>
        )} */}
        {prob && (
          <CountUp
            className="percent"
            end={Math.round(parseFloat(prob.result) * 10000) / 100}
            decimals={2}
            suffix="%"
          />
        )}
        {/* {prob && (
          <ColumnChart prob={Math.round(parseFloat(prob.result) * 100) / 100} />
        )}{" "} */}
        {prob && (
          <Rowbar prob={Math.round(parseFloat(prob.result) * 100) / 100} />
        )}
      </div>
    </div>
  );
};

export default App;
