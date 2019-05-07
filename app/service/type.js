const Service = require('egg').Service;

class TypeService extends Service {

    async findAll() {
        const type = await this.app.mysql.query('select * from types');
        return type;
    }

    async countUserByType() {
        const result = await this.app.mysql.query('select type_id, ( select t.t_name from types t where t.id = u.type_id) as t_name,count(*) as total from users u GROUP BY u.type_id');
        return result;
    }
}

module.exports = TypeService;