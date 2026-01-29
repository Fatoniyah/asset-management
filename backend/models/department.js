const db = require('../db');

class Department {
  static getAll(callback) {
    db.query('SELECT * FROM Departments', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM Departments WHERE departments_department_id = ?', [id], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO Departments SET ?', data, callback);
  }

  static update(id, data, callback) {
    db.query('UPDATE Departments SET ? WHERE departments_department_id = ?', [data, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM Departments WHERE departments_department_id = ?', [id], callback);
  }
}

module.exports = Department;
