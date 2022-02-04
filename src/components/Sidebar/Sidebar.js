import React, {useState} from 'react';
import {DASHBOARD, ABOUT, USERS, USER_DETAILS, PRODUCTS,} from '../../settings/constants';
import {Menu, Layout} from "antd";
import {Link} from "react-router-dom";
import {
    TeamOutlined, DashboardOutlined, ExclamationCircleOutlined, DropboxOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = () => {
        setCollapsed(!collapsed)
    };

    const currentURL = window.location.pathname;

    const selectedKey = () => {
        if (currentURL === USERS) {
            return [USERS]
        } else if (currentURL.split('ers/')[0] === USER_DETAILS.split('ers/')[0]) {
            return [USERS]
        } else {
            return [currentURL]
        }
    };

    return (
        <Layout.Sider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
            <div style={logo}/>

            <Menu
                theme="dark"
                defaultSelectedKeys={selectedKey()}
                mode="inline"
            >
                <Menu.Item key={DASHBOARD} icon={<DashboardOutlined/>}>
                    <Link to={DASHBOARD}>Dashboard</Link>
                </Menu.Item>

                <Menu.Item key={PRODUCTS} icon={<DropboxOutlined/>}>
                    <Link to={PRODUCTS}>Products</Link>
                </Menu.Item>

                <Menu.Item key={USERS} icon={<TeamOutlined/>}>
                    <Link to={USERS}>Users</Link>
                </Menu.Item>

                <Menu.Item key={ABOUT} icon={<ExclamationCircleOutlined/>}>
                    <Link to={ABOUT}>About</Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>
    );
};

export default Sidebar;

const logo = {
    height: 32,
    margin: 16,
    background: 'rgba(255, 255, 255, 0.3)',
};
