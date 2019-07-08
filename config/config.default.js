exports.keys = '18165359296';
exports.mysql = {
    // 单数据库信息配置
    client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'root',
        // 数据库名
        database: 'node_user',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
};

exports.security = {
    csrf: {
        enable: false
    }
}

exports.cluster = {
    listen: {
        port: 7001,
        hostname: '10.27.235.233',
    },
};