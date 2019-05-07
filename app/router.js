const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
    instance: {
        app: 'user',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        statusPageUrl: 'http://localhost:7001/info',
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
        outputParams: "String"
    },
    eureka: {
        host: 'localhost',
        port: 8080,
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
};