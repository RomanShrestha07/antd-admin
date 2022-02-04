import React from 'react';
import {Card, Col, Row} from "antd";
import CountUp from "react-countup";
import {DropboxOutlined, ShopOutlined, ShoppingCartOutlined, TeamOutlined} from "@ant-design/icons";
import {Column, Line, Pie} from '@ant-design/charts';

const NumberCard = ({icon, title, number, color}) => {
    const styles = {
        numberCard: {
            padding: '32px',
            marginBottom: '24px',
            cursor: 'pointer'
        },
        iconWarp: {
            fontSize: '54px',
            float: 'left',
            color: color,
        },
        content: {
            width: '100%',
            paddingLeft: '78px',
        },
        title: {
            lineHeight: '16px',
            fontSize: '16px',
            marginBottom: '8px',
            height: '16px',
        },
        number: {
            lineHeight: '32px',
            fontSize: '24px',
            height: '32px',
            marginBottom: 0,
        }
    };

    return (
        <Card
            style={styles.numberCard}
            bordered={false}
            bodyStyle={{padding: 10}}
            hoverable
        >
              <span style={styles.iconWarp}>
                {icon}
              </span>
            <div style={styles.content}>
                <p style={styles.title}>{title || 'No Title'}</p>
                <p style={styles.number}>
                    <CountUp
                        start={0}
                        end={number}
                        duration={2.75}
                        useEasing
                        useGrouping
                        separator=","
                    />
                </p>
            </div>
        </Card>
    )
}

const Dashboard = () => {
    const cards = [
        {
            title: 'Products',
            number: 150,
            icon: <DropboxOutlined/>,
            color: 'palegreen',
        },
        {
            title: 'Users',
            number: 50,
            icon: <TeamOutlined/>,
            color: 'turquoise',
        },
        {
            title: "Shops",
            number: 10,
            icon: <ShopOutlined/>,
            color: 'salmon',
        },
        {
            title: 'Orders',
            number: 1000,
            icon: <ShoppingCartOutlined/>,
            color: 'violet',
        },
    ];

    const numberCards = cards.map(card => (
        <Col key={card.title} lg={6} md={12}>
            <NumberCard number={card.number} icon={card.icon} title={card.title} color={card.color}/>
        </Col>
    ))

    const data = [
        {
            type: 'Furniture appliances',
            sales: 38,
        },
        {
            type: 'Cereals, Oils and Non-staple food',
            sales: 52,
        },
        {
            type: 'Fresh fruits',
            sales: 0,
        },
        {
            type: 'Beauty care',
            sales: 145,
        },
        {
            type: 'Baby products',
            sales: 48,
        },
        {
            type: 'Imported food',
            sales: 38,
        },
        {
            type: 'Food and drink',
            sales: 38,
        },
        {
            type: 'Home cleaning',
            sales: 38,
        },
    ];

    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            type: {alias: 'Category'},
            sales: {alias: 'Sales'},
        },
    };

    const pieData = [
        {
            type: 'Brilliant Boutique',
            value: 27,
        },
        {
            type: 'The Authentic Corner',
            value: 25,
        },
        {
            type: 'Cartmax',
            value: 18,
        },
        {
            type: 'DollarSmart',
            value: 15,
        },
        {
            type: 'Megaplex',
            value: 10,
        },
        {
            type: "Shopper's Delight",
            value: 5,
        },
    ];

    const pieConfig = {
        appendPadding: 10,
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: '{value}%',
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [{type: 'element-selected'}, {type: 'element-active'}],
        legend: {
            layout: 'vertical',
            position: 'right',
        },
    };

    const lineData = [
        {year: '2019', value: 3},
        {year: '2020', value: 4},
        {year: '2021', value: 3.5},
        {year: '2022', value: 5},
        {year: '2023', value: 4.9},
        {year: '2024', value: 6},
        {year: '2025', value: 7},
        {year: '2026', value: 9},
        {year: '2027', value: 13},
    ];

    const lineConfig = {
        data: lineData,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    return (
        <Row gutter={24}>
            {numberCards}

            <Col lg={24} md={24}>
                <Card bordered={false} hoverable>
                    <div style={chartTitle}>Yearly Sales</div>

                    <Column {...config} style={{marginBottom: 16}}/>
                </Card>
            </Col>

            <Col lg={12} md={24} style={{marginTop: 24}}>
                <Card bordered={false} hoverable>
                    <div style={chartTitle}>Shop Earnings</div>

                    <Pie {...pieConfig}/>
                </Card>
            </Col>

            <Col lg={12} md={24} style={{marginTop: 24}}>
                <Card bordered={false} hoverable>
                    <div style={chartTitle}>Projected Growth</div>

                    <Line {...lineConfig}/>
                </Card>
            </Col>
        </Row>
    );
};

export default Dashboard;

const chartTitle = {
    fontSize: '16px',
    lineHeight: '16px',
    marginBottom: '24px',
    height: '16px',
};