const db = require('../db');

class User {
  static getAll(callback) {
    db.query('SELECT * FROM Users', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM Users WHERE users_user_id = ?', [id], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO Users SET ?', data, callback);
  }

  static update(id, data, callback) {
    db.query('UPDATE Users SET ? WHERE users_user_id = ?', [data, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM Users WHERE users_user_id = ?', [id], callback);
  }
}

module.exports = User;
