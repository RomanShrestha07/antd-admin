import {Link, withRouter, useParams} from "react-router-dom";
import {Layout, Breadcrumb, BackTop, Row, Button, Col, Dropdown, Avatar, Menu} from 'antd';
import {
    ArrowUpOutlined, DashboardOutlined, BellOutlined, UserOutlined, SettingOutlined, LogoutOutlined,
    LoginOutlined, ExclamationCircleOutlined, TeamOutlined, DropboxOutlined,
} from "@ant-design/icons";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/auth";
import {LOGIN} from "../settings/constants";
import Sidebar from "../components/Sidebar/Sidebar";

const {Header, Content, Footer} = Layout;

const Bread = withRouter(props => {
    const {id} = useParams();
    const {location} = props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    let userDetails = `/vendors/${id}`;

    const breadcrumbNameMap = {
        '/': 'Dashboard',
        '/about': 'About',
        '/products': 'Products',
        '/users': 'Users',
    };

    breadcrumbNameMap[userDetails] = id;

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        switch (url) {
            case '/about':
                return (
                    <Breadcrumb.Item key={url}>
                        <Link to={url}><ExclamationCircleOutlined/> {breadcrumbNameMap[url]}</Link>
                    </Breadcrumb.Item>
                );
            case '/products':
                return (
                    <Breadcrumb.Item key={url}>
                        <Link to={url}><DropboxOutlined/> {breadcrumbNameMap[url]}</Link>
                    </Breadcrumb.Item>
                );
            case '/users':
                return (
                    <Breadcrumb.Item key={url}>
                        <Link to={url}><TeamOutlined/> {breadcrumbNameMap[url]}</Link>
                    </Breadcrumb.Item>
                );
            default:
                return (
                    <Breadcrumb.Item key={url}>
                        <Link to={url}>{breadcrumbNameMap[url]}</Link>
                    </Breadcrumb.Item>
                );
        }
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <DashboardOutlined/> Dashboard
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <div>
            <Breadcrumb style={{margin: '16px 0'}}>{breadcrumbItems}</Breadcrumb>
        </div>
    );
});

const AdminLayout = ({children}) => {
    const [username, setUsername] = useState('');
    const {signOut} = useContext(AuthContext);

    useEffect(() => {
        const user = localStorage.getItem('username');
        if (user) {
            setUsername(user);
        } else {
            setUsername('Guest');
        }
    }, []);

    const handleSignOut = () => {
        signOut();
    };

    const menu = (
        <Menu mode='horizontal'>
            <Menu.Item key={'settings'} icon={<SettingOutlined/>}>
                Settings
            </Menu.Item>
            <Menu.Item key={'logout'} icon={<LogoutOutlined/>} onClick={handleSignOut}>
                Logout
            </Menu.Item>
        </Menu>
    );

    const menuGuest = (
        <Menu mode='horizontal'>
            <Menu.Item key={'login'} icon={<LoginOutlined/>} onClick={handleSignOut}>
                <Link to={LOGIN}>Login</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sidebar/>

            <Layout>
                <Header style={layout_background_header}>
                    <Row justify="end">
                        <Col>
                            <Button type="text" shape="circle" size="large" icon={<BellOutlined/>}/>
                        </Col>

                        <Col style={{marginRight: 16}}>
                            <Dropdown overlay={username !== 'Guest' ? menu : menuGuest} placement="bottomRight">
                                <Button type="text" size="large">
                                    <>
                                        <span>{username}</span>
                                        <Avatar style={{marginLeft: 8}} icon={<UserOutlined/>}/>
                                    </>
                                </Button>
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>

                <Content style={{margin: '0 16px'}}>
                    <Bread/>

                    <div>
                        {children}
                    </div>
                </Content>

                <Footer style={{textAlign: 'center'}}>©2021 Created by Roman</Footer>

                <BackTop>
                    <div style={back_top_style}><ArrowUpOutlined/></div>
                </BackTop>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;

const layout_background_header = {
    background: '#fff',
    padding: 0,
};

const back_top_style = {
    height: 40,
    width: 40,
    lineHeight: '40px',
    borderRadius: 4,
    backgroundColor: '#1088e9',
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
};
