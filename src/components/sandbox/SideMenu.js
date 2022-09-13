import React, { useEffect, useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "../../views/NewsSandBox/NewsSandBox.css";
import "./index.css";
import { withRouter } from "react-router-dom";
import axios from "axios";

const { Sider } = Layout;
const { SubMenu } = Menu;

const iconList = {
  "/home": <MailOutlined />,
  "/user-manage": <MailOutlined />,
  "/user-manage/list": <MailOutlined />,
  "/right-manage/role/list": <MailOutlined />,
  "/right-manage/right/list": <MailOutlined />,
  "/news-manage/add": <MailOutlined />,
  "/news-manage/draft": <MailOutlined />,
  "/news-manage/category": <MailOutlined />,
  "/audit-manage/audit": <MailOutlined />,
  "/audit-manage/list": <MailOutlined />,
  "/publish-manage/unpublished": <MailOutlined />,
  "/publish-manage/published": <MailOutlined />,
  "/publish-manage/sunset": <MailOutlined />,
  "/right-manage": <MailOutlined />,
  "/news-manage": <MailOutlined />,
  "/audit-manage": <MailOutlined />,
  "/publish-manage": <MailOutlined />,
};

function SideMenu(props) {
  const [meun, setMeun] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then((res) => {
      const needParams = res.data;
      // for (let i = 0; i < needParams.length; i++) {
      //   needParams[i].label = needParams[i].title;
      // }
      setMeun(needParams);
      console.log(needParams);
    });
  }, []);

  const checkPagePermission = (item) => {
    // 访问 menu 权限
    return item.pagepermisson === 1;
  };

  const renderMenu = (meun) => {
    return meun.map((item) => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return (
          <SubMenu key={item.key} icon={iconList[item.key]} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        checkPagePermission(item) && (
          <Menu.Item
            onClick={() => {
              props.history.push(item.key);
            }}
            key={item.key}
            icon={iconList[item.key]}
          >
            {item.title}
          </Menu.Item>
        )
      );
    });
  };

  const selectKeys = props.location.pathname;
  // 获取当前 Menu 的父层级（ 刷新后自动展开 ）
  const openKeys = ["/" + props.location.pathname.split("/")[1]];

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <div className="logo">Flow</div>
        <div style={{ flex: 1, overflow: "auto" }}>
          {/* style={{ flex: 1, overflow: "auto" }} */}
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={openKeys}
            defaultSelectedKeys={[selectKeys]}
          >
            {renderMenu(meun)}
          </Menu>
        </div>
      </div>
    </Sider>
  );
}

export default withRouter(SideMenu);
