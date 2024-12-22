import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import {
  EnvironmentOutlined,
  UserOutlined,
  SettingOutlined,
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import './css/Navbar.css';

import Lulogo from '../assets/UsachSB.png';
import UsachSe from '../assets/LogoSF.png';

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="navbar">
      <Button type="primary" onClick={toggleCollapsed} className="collapse-button">
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <div className={`menu-wrapper ${collapsed ? 'collapsed' : ''}`}>
        <div className="logo">
          <img src={Lulogo} alt="USACH Logo" className="logo-image" />
          <h1 className="logo-text">USACH</h1>
        </div>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="1" icon={<EnvironmentOutlined />}>
            Lugares Frecuentados
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            Pertenencias
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            Perfil
          </Menu.Item>
          <Menu.Item key="4" icon={<SettingOutlined />}>
            Configuración
          </Menu.Item>
        </Menu>
        <div className="footer-logo">
          <img src={UsachSe} alt="USACH Segura" />
          <p>USACH Segura</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;