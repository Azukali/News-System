import React, { useState } from "react";
import { Layout, Dropdown, Space, Menu, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

function TopHeader() {
  const [collapsed, serCollapsed] = useState(false);
  const changCollapsed = () => {
    serCollapsed(!collapsed);
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              超级管理员
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              2nd menu item (disabled)
            </a>
          ),
          icon: <SmileOutlined />,
          disabled: true,
        },
        {
          key: "3",
          danger: true,
          label: "退出",
        },
      ]}
    />
  );
  return (
    <Header
      className="site-layout-background"
      style={{ padding: "0 16px", color: "#fff" }}
    >
      {collapsed ? (
        <MenuUnfoldOutlined onClick={changCollapsed} />
      ) : (
        <MenuFoldOutlined onClick={changCollapsed} />
      )}

      <div style={{ float: "right" }}>
        <span>欢迎回来</span>
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: "#fff" }}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}

export default TopHeader;
