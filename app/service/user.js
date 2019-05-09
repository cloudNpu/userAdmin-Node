const Service = require('egg').Service;

class UserService extends Service {

    async findAll() {
        const results = await this.app.mysql.query('select u.id as id,u.u_name as u_name,u.u_age as u_age,u.type_id as type_id,t.t_name as type_name from users u,types t where u.type_id = t.id');
        return results;
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