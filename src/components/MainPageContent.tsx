import { ConnectButton } from "@rainbow-me/rainbowkit";

import React, { useState, useContext, useEffect } from 'react';
import { ToolOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';

import { useAccount } from "wagmi";
import AppContext from 'context/AppContext'
import Account from "components/account/Account";
import LiveMint from "components/LiveMint";
import Mints from "components/Mints";


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const MainPageContent = () => {

  const { address, isConnected } = useAccount();
  const { isSignedIn, setIsSignedIn } = useContext(AppContext);

  const items: MenuItem[] = [
    getItem('Live Mint', 'sub1', <UserOutlined />, [
      ...(isConnected && isSignedIn ? [
        getItem('Account', '1'),
        getItem('Mint', '2'),
        getItem('Tokens', '3'),
      ] : []),
    ]),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const {token: { colorBgContainer }} = theme.useToken();

  const handleMenuClick = (e: any) => {
    setActiveItem(e.key);
  }

  useEffect(() => {
    setActiveItem('1');
  }, [setActiveItem]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <a href="https://eden.art">
          <center>
            <img src="logo192.png" style={{width: "66.6%"}}/>
          </center>
        </a>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2']}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ 
          padding: 16, 
          background: colorBgContainer, 
          marginLeft: "auto", 
          marginRight: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <ConnectButton />
        </Header>
        <Content style={{ margin: '0 16px', padding: "16px", background: colorBgContainer }}>    
          {activeItem === '1' && <Account />}
          {activeItem === '2' && <LiveMint />}
          {activeItem === '3' && <Mints />}
        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
};

export default MainPageContent;