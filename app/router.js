const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
    instance: {
        app: 'user',
        hostName: '10.27.235.233',
        ipAddr: '10.27.235.233',
        statusPageUrl: 'http://10.27.235.233:7001/info',
        port: {
            '$': 7001,
            '@enabled': true,
        },
        vipAddress: 'test.user.com',
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        inputParams: "{\"a\":\"int\"}",
        outputParams: "String",
        userId:1
    },
    eureka: {
        host: '10.70.168.147',
        port: 8090,
        servicePath: '/cloud/apps/'
    }
});
client.start();

module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.type.countUserByType);
    router.get('/users', controller.user.findAll);
    router.post('/users', controller.user.create);
    router.put('/users/:id', controller.user.update);
    router.delete('/users/:id', controller.user.delete);
    router.get('/types', controller.type.findAll);
    router.post('/login', controller.user.login);
};