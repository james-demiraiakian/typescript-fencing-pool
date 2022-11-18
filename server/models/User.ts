import pool from '../database.js';
import { userInterface } from '../../common/interface.js';

export default class User {
  id: number;
  name: string;
  email: string;
  #passwordHash: string;
  clubId: string;
  owner: boolean;

  constructor(row: any) {
    this.id = row.id;
    this.name = row.name;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
    this.clubId = row.club_id;
    this.owner = row.owner;
  }

  static async insert(user: userInterface): Promise<User> {
    const { name, email, passwordHash, clubId, owner } = user;

    const { rows } = await pool.query(
      `
      INSERT INTO
        users (name, email, password_hash, club_id, owner)
      VALUES
        ($1, $2, $3, $4, $5)
      RETURNING
        *
      `,
      [name, email, passwordHash, clubId, owner]
    );
    return new User(rows[0]);
  }

  static async getByEmail(email: string) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        email=$1
      `,
      [email]
    );

    // if (!rows[0]) return null;

    return new User(rows[0]);
  }

  static async testDelete(email: string) {
    const { rows } = await pool.query(
      `DELETE FROM users WHERE email=$1`,
      [email]
    );
  }

  get passwordHash() {
    return this.#passwordHash;
  }
}
