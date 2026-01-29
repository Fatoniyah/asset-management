const db = require('../db');

class AssetDepreciation {
  static getAll(callback) {
    db.query('SELECT * FROM AssetDepreciation', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM AssetDepreciation WHERE asset_depreciation_depreciation_id = ?', [id], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO AssetDepreciation SET ?', data, callback);
  }

  static update(id, data, callback) {
    db.query('UPDATE AssetDepreciation SET ? WHERE asset_depreciation_depreciation_id = ?', [data, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM AssetDepreciation WHERE asset_depreciation_depreciation_id = ?', [id], callback);
  }
}

module.exports = AssetDepreciation;
