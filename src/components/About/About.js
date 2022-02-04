import React from 'react';
import {Card, Col, Typography} from "antd";

const {Title, Paragraph, Text} = Typography;

const About = () => {
    return (
        <div style={{margin: 'auto'}}>
            <Col style={{margin: 'auto', textAlign: 'center'}}>
                <Card title='About'>
                    <Typography style={{textAlign: 'left'}}>
                        <Title level={2}>About</Title>
                        <Paragraph>
                            This is a small sample project of an Admin Panel created exclusively using the <a
                            href="https://ant.design/">Ant Design</a> library.
                        </Paragraph>

                        <Paragraph>
                            The aim of this project was to create a sort of <Text strong>template for future projects
                            using Ant
                            Design</Text>.
                        </Paragraph>

                        <Paragraph>
                            The Admin Panel contains:
                        </Paragraph>

                        <Paragraph>
                            <ul>
                                <li>
                                    <Text strong>Login Page:</Text> With a demo on simple token authentication login
                                    system.
                                </li>
                                <li>
                                    <Text strong>Dashboard Page:</Text> With demos on multiple types of Ant Design
                                    Charts.
                                </li>
                                <li>
                                    <Text strong>Products Page:</Text> With demos on state manipulation functionalities
                                    leading to data display, delete and search as well as data add and edit using forms.
                                </li>
                                <li>
                                    <Text strong>Users Page:</Text> With demos on data searching, filtering and sorting
                                    using
                                    APIs.
                                </li>
                                <li>
                                    <Text strong>About Page:</Text> With a demo on typography using Ant Design.
                                </li>
                            </ul>
                        </Paragraph>
                    </Typography>
                </Card>
            </Col>
        </div>
    );
};

export default About;