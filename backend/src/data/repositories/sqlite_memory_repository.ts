import { Memory } from '@domain/types/memory';
import db from '@data/database/sqlite';
import { IMemoryRepository } from '@domain/repositories/memory_repository';

export class SQLiteMemoryRepository implements IMemoryRepository {
  constructor() {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS memories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          description TEXT,
          filename TEXT NOT NULL,
          url TEXT NOT NULL,
          timestamp DATE
        )
      `);
    });
  }

  async getMemories(sort: string): Promise<Memory[]> {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM memories ORDER BY timestamp ' +
          (sort === 'newest' ? 'DESC' : 'ASC'),
        (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows as Memory[]);
        },
      );
    });
  }

  async getMemory(id: number): Promise<Memory> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row as Memory);
      });
    });
  }

  async createMemory(memory: Partial<Memory>): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO memories (title, description, filename, url, timestamp) VALUES (?, ?, ?, ?, ?)',
        [
          memory.title,
          memory.description,
          memory.filename,
          memory.url,
          memory.timestamp,
        ],
        err => {
          if (err) {
            reject(err);
          }
          resolve();
        },
      );
    });
  }

  updateMemory(memory: Partial<Memory>): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE memories SET title = ?, description = ?, timestamp = ? WHERE id = ?',
        [memory.title, memory.description, memory.timestamp, memory.id],
        err => {
          if (err) {
            reject(err);
          }
          resolve();
        },
      );
    });
  }

  deleteMemory(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM memories WHERE id = ?', [id], err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
