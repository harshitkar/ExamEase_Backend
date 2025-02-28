const Classroom = require("../models/classroom");

class ClassroomRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findByJoinCode(join_code) {
    const result = await this.pool.query(
      `SELECT * FROM classrooms WHERE join_code = $1`,
      [join_code]
    );

    if (result.rows.length === 0) return null;

    return new Classroom(result.rows[0]);
  }

  async addUserToClassroom(user_id, classroom_id, role) {
    const result = await this.pool.query(
      `INSERT INTO user_classrooms (user_id, classroom_id, role) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [user_id, classroom_id, role]
    );

    return result.rows[0];
  }

  async assignTestToClassroom(classroom_id, test_id) {
    const result = await this.pool.query(
      `INSERT INTO classroom_tests (classroom_id, test_id) 
       VALUES ($1, $2) 
       RETURNING *`,
      [classroom_id, test_id]
    );

    return result.rows[0];
  }

  async createClassroom({ classroom_name, join_code, created_by }) {
    const result = await this.pool.query(
      `INSERT INTO classrooms (classroom_name, join_code, created_by) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [classroom_name, join_code, created_by]
    );

    return new Classroom(result.rows[0]);
  }

  async loadAllClassrooms(user_id) {
    const result = await this.pool.query(
      `SELECT c.*, u.full_name AS creator_name 
       FROM classrooms c
       JOIN user_classrooms uc ON c.id = uc.classroom_id
       JOIN users u ON c.created_by = u.id
       WHERE uc.user_id = $1`,
      [user_id]
    );

    return result.rows;
  }

  async isUserInClassroom(user_id, classroom_id) {
    const result = await this.pool.query(
      `SELECT * FROM user_classrooms WHERE user_id = $1 AND classroom_id = $2`,
      [user_id, classroom_id]
    );
    return result.rows.length > 0;
  }

  async removeUserFromClassroom(user_id, classroom_id) {
    await this.pool.query(
      `DELETE FROM user_classrooms WHERE user_id = $1 AND classroom_id = $2`,
      [user_id, classroom_id]
    );
  }

  async getClassroomMembers(classroom_id) {
    const result = await this.pool.query(
      `SELECT user_id, role FROM user_classrooms WHERE classroom_id = $1`,
      [classroom_id]
    );
    return result.rows;
  }

  async deleteClassroom(classroom_id) {
    await this.pool.query(`DELETE FROM classrooms WHERE id = $1`, [classroom_id]);
  }

  async countTeachersInClassroom(classroom_id) {
    const result = await this.pool.query(
      `SELECT COUNT(*) FROM user_classrooms WHERE classroom_id = $1 AND role = 'teacher'`,
      [classroom_id]
    );
    return parseInt(result.rows[0].count, 10);
  }
}

module.exports = ClassroomRepository;
