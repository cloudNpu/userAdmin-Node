const Controller = require('egg').Controller;

class UserController extends Controller {

    async findAll() {
        const {ctx} = this;
        const res = await ctx.service.user.findAll();
        if (res != undefined && res != null) {
            ctx.body = res;
            ctx.status = 200;
        } else {
            ctx.status = 404;
        }
    }


    async create() {
        const {ctx} = this;
        const user = ctx.request.body.user;
        const id = await ctx.service.user.save(user);
        if (id != undefined && id != null) {
            ctx.body = {id: id};
            ctx.status = 201;
        } else {
            ctx.status = 400;
        }

    }

    async update() {
        const {ctx} = this;
        let user = ctx.request.body.user;
        user.id = ctx.params.id;
        const result = await ctx.service.user.update(user);
        if (result) {
            ctx.status = 201;
        } else {
            ctx.status = 400;
        }
    }

    async delete() {
        const {ctx} = this;
        const result = await ctx.service.user.delete({id: ctx.params.id});
        if (result) {
            ctx.status = 204;
        } else {
            ctx.status = 400;
        }
    }

    async login() {
        const {ctx} = this;
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;

        if(username === 'admin' && password === 'admin') {
            ctx.status = 200;
        } else {
            ctx.status = 400;
        }
    }
    
}

module.exports = UserController;