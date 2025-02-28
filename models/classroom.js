class Classroom {
  constructor({ id, classroom_name , join_code, created_by, created_at , creator_name}) {
    this.id = id;
    this.classroom_name = classroom_name;
    this.join_code = join_code;
    this.created_by = created_by;
    this.creator_name = creator_name;
    this.created_at = created_at;
  }
}

module.exports = Classroom;
