import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";

function RightList() {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/rights").then((res) => {
      console.log(res.data);
      setDataSource(res.data);
    });
  }, []);

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div>
      <Table bordered={true} dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default RightList;
