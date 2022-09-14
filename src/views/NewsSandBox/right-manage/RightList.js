import React, { useState, useEffect } from "react";
import { Table, Tag, Card, Button, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { log } from "@antv/g2plot/lib/utils";

const { confirm } = Modal;

function RightList() {
  const [dataSource, setDataSource] = useState([]);

  const confirmMehod = (data) => {
    confirm({
      title: "你确定要删除吗?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // console.log("OK");
        deleteMehod(data);
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };

  const deleteMehod = (data) => {
    console.log(data);
  };

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      console.log(res.data);
      const list = res.data;
      list[0].children = "";
      setDataSource(res.data);
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => {
        return <b>{id}</b>;
      },
    },
    {
      title: "权限名称",
      dataIndex: "title",
      render: (id) => {
        return <Card size="small">{id}</Card>;
      },
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (data) => {
        return <Tag color="lime">{data}</Tag>;
      },
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMehod(data)}
            ></Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default RightList;
