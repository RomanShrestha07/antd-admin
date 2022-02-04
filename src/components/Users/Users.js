import React, {useEffect, useState} from 'react';
import {Card, Col, Descriptions, Divider, Drawer, Input, message, Row, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import {API_URL} from "../../settings/constants";
import {search} from "../../utils/helper";

const usersEndpoint = `${API_URL}/users`;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);

    const [selectedUser, setSelectedUser] = useState({});

    const [searchValue, setSearchValue] = useState('');
    const [sortQuery, setSortQuery] = useState('');
    const [filterQuery, setFilterQuery] = useState('');

    const [drawer, setDrawer] = useState(false);

    const [spinState, setSpinState] = useState(false);

    const spinOn = () => {
        setSpinState(true);
    };

    const spinOff = () => {
        setSpinState(false);
    };

    const showDrawer = () => {
        setDrawer(true);
    };

    const closeDrawer = () => {
        setDrawer(false);
        setSelectedUser({});
    };

    useEffect(() => {
        const fetchUsers = async () => {
            return (
                axios.get(`${usersEndpoint}`)
                    .then(response => {
                        console.log('Users Status:', response.status)
                        console.log('Users:', response.data)
                        return (response.data)
                    })
                    .catch(error => {
                        message.error(`An error has occurred. - ${error}`);
                    })
            )
        };

        const getUsers = async () => {
            spinOn();
            const usersFromServer = await fetchUsers();
            const jobList = [];
            if (usersFromServer) {
                // eslint-disable-next-line array-callback-return
                usersFromServer.map(user => {
                    user['createdAt'] = moment(user.createdAt).format('YYYY/MM/DD, hh:mm A');
                    jobList.push(user['job']);
                });
                setUsers(usersFromServer);
                spinOff();

                let jobSet = new Set(jobList);
                console.log('Job List:', jobList);
                console.log('Job Set:', jobSet);
                let jobFilter = [];
                jobSet.forEach(js => jobFilter.push({value: js, text: js}));
                console.log('Job Filter:', jobFilter.sort());
                setJobs(jobFilter);
            }
            spinOff();
        };

        getUsers().then(r => console.log('getUsers', r));
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
        },
        {
            title: 'Job',
            dataIndex: 'job',
            filters: jobs,
            filterSearch: true,
        },
    ];

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setSearchValue(searchValue);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        console.log('Pagination:', pagination);
        console.log('Filters:', filters);
        console.log('Sort Field:', sorter.field);
        console.log('Sort Order:', sorter.order);

        const jobList = filters['job'];
        if (jobList) {
            if (jobList.length !== 0) {
                setFilterQuery(`job=${jobList[0]}`);
            } else {
                setFilterQuery('');
            }
        } else {
            setFilterQuery('');
        }

        let sortField = sorter['field'];
        let sortOrder = sorter['order'];
        let sortQuery = '';
        if (sortField) {
            if (sortOrder === 'ascend') {
                sortQuery = `sortBy=${sortField}&order=asc`;
            } else if (sortOrder === 'descend') {
                sortQuery = `sortBy=${sortField}&order=desc`;
            }
            setSortQuery(sortQuery);
        } else {
            setSortQuery('');
        }
    };

    const searchUsers = async (searchValue, typeQuery, sortQuery) => {
        spinOn();
        let users = await search(`${usersEndpoint}?search=${searchValue}&${filterQuery}&${sortQuery}`);
        console.log('Users:', users);
        if (users) {
            if (users.length !== 0) {
                setUsers(users);
            } else {
                setUsers([]);
            }
        }
        spinOff();
    };

    useEffect(() => {
        searchUsers(searchValue, filterQuery, sortQuery).then(r => console.log(r));
    }, [searchValue, filterQuery, sortQuery]);

    const handleRowClick = (record) => {
        console.log('Selected User:', record);

        if (record) {
            setSelectedUser(record);
        }

        showDrawer();
    };

    return (
        <div style={{margin: 'auto'}}>
            <Col style={{margin: 'auto', textAlign: 'center'}}>
                <Card title='Users'>
                    <Col span={24} style={{margin: 'auto', textAlign: 'left'}}>
                        <Card>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Input
                                        addonBefore={<SearchOutlined/>}
                                        placeholder='Search User'
                                        onChange={handleSearchChange}
                                        value={searchValue}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Divider>List of Users</Divider>

                    <Table
                        bordered={true}
                        loading={spinState}
                        columns={columns}
                        dataSource={users}
                        rowKey={record => record.id}
                        onChange={handleTableChange}
                        onRow={(record, rowIndex) => {
                            return {
                                onClick: () => {
                                    handleRowClick(record)
                                },
                            };
                        }}
                    />
                </Card>
            </Col>

            <Drawer
                width={'40%'}
                title="User Info"
                onClose={closeDrawer}
                visible={drawer}
            >
                <Descriptions bordered>
                    <Descriptions.Item label='ID' span={3}>
                        {selectedUser.id}
                    </Descriptions.Item>

                    <Descriptions.Item label='Name' span={3}>
                        {selectedUser.name}
                    </Descriptions.Item>

                    <Descriptions.Item label='Job' span={3}>
                        {selectedUser.job}
                    </Descriptions.Item>

                    <Descriptions.Item label='Email' span={3}>
                        {selectedUser.email}
                    </Descriptions.Item>

                    <Descriptions.Item label='Address' span={3}>
                        {selectedUser.address}
                    </Descriptions.Item>

                    <Descriptions.Item label='Contact' span={3}>
                        {selectedUser.contact}
                    </Descriptions.Item>

                    <Descriptions.Item label='Created' span={3}>
                        {selectedUser.createdAt}
                    </Descriptions.Item>
                </Descriptions>
            </Drawer>
        </div>
    );
};

export default Users;