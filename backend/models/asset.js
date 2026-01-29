const db = require('../db');

class Asset {
  static getAll(callback) {
    db.query('SELECT * FROM Assets', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM Assets WHERE assets_asset_id = ?', [id], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO Assets SET ?', data, callback);
  }

  static update(id, data, callback) {
    db.query('UPDATE Assets SET ? WHERE assets_asset_id = ?', [data, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM Assets WHERE assets_asset_id = ?', [id], callback);
  }
}

module.exports = Asset;
