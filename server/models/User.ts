import pool from '../database';

export default class User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  club_id: string;
  owner: boolean;

  constructor(row: any) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.password_hash = row.password_hash;
    this.club_id = row.club_id;
    this.owner = row.owner;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      `
    );

    return rows.map((row) => new User(row));
  }
}
