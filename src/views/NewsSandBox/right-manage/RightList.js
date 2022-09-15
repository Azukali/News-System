import React, { useState, useEffect } from "react";
import { Table, Tag, Card, Button, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

const { confirm } = Modal;

function RightList() {
  const [dataSource, setDataSource] = useState([]);

  const confirmMehod = (data) => {
    console.log(data);
    confirm({
      title: "你确定要删除吗?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMehod(data);
      },
      onCancel() {
        // console.log("Cancel");
      },
    });
  };

  const deleteMehod = (item) => {
    console.log(item);
    if (item.grade === 1) {
      // 判断树分级是否为 1
      setDataSource(dataSource.filter((data) => data.id !== item.id));
      // 遍历出 dataSource 过滤id一致的渲染出来
      axios.delete(`http://localhost:5000/rights/${item.id}`);
    } else {
      let list = dataSource.filter((data) => data.id === item.rightId);
      list[0].children = list[0].children.filter((data) => data.id !== item.id);
      console.log(list);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      const list = res.data;
      list.forEach((item) => {
        if (item.children.length === 0) {
          item.children = "";
        }
      });
      setDataSource(list);
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
