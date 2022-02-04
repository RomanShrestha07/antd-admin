import {useContext} from "react";
import {Button, Card, Form, Input, Image, Typography, Row, Col} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import Logo from '../../assets/image/logo512.png';
import Background from '../../assets/image/login-background.jpg';
import {AuthContext} from '../../context/auth';
import Spinner from "../Spinner/Spinner";
import {useHistory, useLocation, Redirect} from 'react-router-dom';

const {Text} = Typography;

const Login = () => {
    const [form] = Form.useForm();

    let history = useHistory();
    let location = useLocation();
    const {authenticate, isAuthenticated} = useContext(AuthContext);
    if (isAuthenticated) return <Redirect to={{pathname: '/'}}/>;

    let {from} = (location.state) || {from: {pathname: '/'}};
    let login = ({username, password}) => {
        console.log('login:', username, password)
        authenticate({username, password}, () => {
            history.replace(from);
        });
    };

    return (
        <div style={backgroundStyle}>
            <Card bordered={false} style={{width: 350, margin: 'auto'}} hoverable={true}>
                <Form
                    layout="vertical"
                    form={form}
                    hideRequiredMark
                    onFinish={login}
                >
                    <Form.Item>
                        <Image
                            width={100}
                            src={Logo}
                            placeholder={<Spinner/>}
                        />
                        <h2><strong>Admin Portal</strong></h2>
                        <h4>Admin Portal for Ant Design Admin</h4>
                    </Form.Item>

                    <Form.Item name='username'
                               rules={[{required: true, message: 'Please input your username!'}]}>
                        <Input prefix={<UserOutlined/>} placeholder='Username' size='large'/>
                    </Form.Item>

                    <Form.Item name='password'
                               rules={[{required: true, message: 'Please input your password!'}]}>
                        <Input.Password prefix={<LockOutlined/>} placeholder='Password' size='large'/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Login</Button>
                    </Form.Item>
                </Form>

                <Row gutter={16}>
                    <Col span={12} style={{textAlign: 'left'}}>
                        <Text type="secondary">Username: admin</Text>
                    </Col>
                    <Col span={12} style={{textAlign: 'right'}}>
                        <Text type="secondary">Password: admin</Text>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default Login;

const backgroundStyle = {
    paddingTop: '8%',
    textAlign: 'center',
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#fff',
};
