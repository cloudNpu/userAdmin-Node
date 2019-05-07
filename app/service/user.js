const Service = require('egg').Service;

class UserService extends Service {

    async findAll() {
        const result = await this.app.mysql.query('select * from users u,types t where u.type_id = t.id');
        return result;
    }

    async save(user) {
        const result = await this.app.mysql.insert('users',user);
        return result.insertId;
    }

    async update(user) {
        const result = await this.app.mysql.update('users',user);
        if (result.affectedRows === 1)
            return true;
        return false;
    }

    async delete(user) {
        const result = await this.app.mysql.delete('users',user);
        if (result.affectedRows === 1)
            return true;
        return false;
    }
}

module.exports = UserService;