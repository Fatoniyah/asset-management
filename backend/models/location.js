const db = require('../db');

class Location {
  static getAll(callback) {
    db.query('SELECT * FROM Locations', callback);
  }

  static getById(id, callback) {
    db.query('SELECT * FROM Locations WHERE locations_location_id = ?', [id], callback);
  }

  static create(data, callback) {
    db.query('INSERT INTO Locations SET ?', data, callback);
  }

  static update(id, data, callback) {
    db.query('UPDATE Locations SET ? WHERE locations_location_id = ?', [data, id], callback);
  }

  static delete(id, callback) {
    db.query('DELETE FROM Locations WHERE locations_location_id = ?', [id], callback);
  }
}

module.exports = Location;
