const db = require('../db');

class AssetTransfer {
  static getAll(callback) {
    db.query('SELECT * FROM AssetTransfers', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM AssetTransfers WHERE asset_transfers_transfer_id = ?', [id], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO AssetTransfers SET ?', data, callback);
  }

  static update(id, data, callback) {
    db.query('UPDATE AssetTransfers SET ? WHERE asset_transfers_transfer_id = ?', [data, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM AssetTransfers WHERE asset_transfers_transfer_id = ?', [id], callback);
  }
}

module.exports = AssetTransfer;
