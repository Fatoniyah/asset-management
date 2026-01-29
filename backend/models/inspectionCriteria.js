const db = require('../db');

class InspectionCriteria {
  static getAll(callback) {
    db.query('SELECT * FROM InspectionCriteria', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM InspectionCriteria WHERE inspection_criteria_criteria_id = ?', [id], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO InspectionCriteria SET ?', data, callback);
  }

  static update(id, data, callback) {
    db.query('UPDATE InspectionCriteria SET ? WHERE inspection_criteria_criteria_id = ?', [data, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM InspectionCriteria WHERE inspection_criteria_criteria_id = ?', [id], callback);
  }
}

module.exports = InspectionCriteria;
