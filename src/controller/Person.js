import { openDb } from '../configDB.js';
import crypto from 'crypto';

export default async function createTable() {
  openDb().then((db) => {
    db.exec('CREATE TABLE IF NOT EXISTS Person (id TEXT PRIMARY KEY, name TEXT, age INTEGER)');
  })
}

export async function insertPerson(req, res) {
  const person = req.body;
  person.id = crypto.randomUUID();

  openDb().then((db) => {
    db.run('INSERT INTO Person (id, name, age) VALUES (?,?,?)', [
      person.id,
      person.name,
      person.age,
    ]);
  });
  res.json({
    "code": 200
  });
}

export async function updatePerson(req, res) {
  const person = req.body;
  openDb().then((db) => {
    db.run('UPDATE Person SET name=?, age=? WHERE id=?', [person.name, person.age, person.id]);
  });
  res.json({
    "code": 200
  });
}

export async function selectPeople(req, res) {
  openDb.apply().then((db) => db.all('SELECT * FROM Person').then((people) => res.json({people})));
}

export async function selectPerson(req, res) {
  const {id} = req.body;

  openDb
    .apply()
    .then((db) => db.get('SELECT * FROM Person WHERE id=?', [id]).then((person) => res.json({person})));
}

export async function deletePerson(req, res) {
  const {id} = req.body;

  openDb
    .apply()
    .then((db) => db.get('DELETE FROM Person WHERE id=?', [id]));
  res.json({
    "code": 200
  });
}
