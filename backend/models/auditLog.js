const db = require('../db');

class AuditLog {
  static getAll(callback) {
    db.query('SELECT * FROM AuditLogs', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM AuditLogs WHERE audit_logs_log_id = ?', [id], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO AuditLogs SET ?', data, callback);
  }

  static update(id, data, callback) {
    db.query('UPDATE AuditLogs SET ? WHERE audit_logs_log_id = ?', [data, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM AuditLogs WHERE audit_logs_log_id = ?', [id], callback);
  }
}

module.exports = AuditLog;
