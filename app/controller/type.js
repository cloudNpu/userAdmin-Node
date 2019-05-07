const Controller = require('egg').Controller;

class TypeController extends Controller {
    async findAll() {
        const {ctx} = this;
        const result = await ctx.service.type.findAll();
        if (result != undefined && result != null) {
            ctx.body = result
            ctx.status = 200;
        } else {
            ctx.body = 404;
        }
    }

    async countUserByType() {
        const {ctx} = this;
        const result = {
            port : this.app.config.cluster.listen.port,
            data : await ctx.service.type.countUserByType()
        };
        if (result != undefined && result != null) {
            ctx.body = result;
            ctx.status = 200;
        } else {
            ctx.body = 404;
        }

    }
}

module.exports = TypeController;