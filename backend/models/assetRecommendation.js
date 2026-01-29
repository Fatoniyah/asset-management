const db = require('../db');

class AssetRecommendation {
  static getAll(callback) {
    db.query('SELECT * FROM AssetRecommendations', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM AssetRecommendations WHERE asset_recommendations_recommendation_id = ?', [id], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO AssetRecommendations SET ?', data, callback);
  }

  static update(id, data, callback) {
    db.query('UPDATE AssetRecommendations SET ? WHERE asset_recommendations_recommendation_id = ?', [data, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM AssetRecommendations WHERE asset_recommendations_recommendation_id = ?', [id], callback);
  }
}

module.exports = AssetRecommendation;
