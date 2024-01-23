const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        sorter: true,
    },
    {
        title: '流程名称',
        dataIndex: 'name',
        sorter: true,
        width: '20%',
    },
    {
        title: '用户ID',
        dataIndex: 'userid',
    },
    {
        title: "版本",
        dataIndex: "version"
    },
    {
        title: "部署时间",
        dataIndex: "deployTime"
    },
    {
        title: "操作",
        dataIndex: "action"
    }
];
export default columns