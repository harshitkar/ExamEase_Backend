class Classroom {
  constructor({ id, classroomName, joinCode, createdBy, createdAt , creatorName}) {
    this.id = id;
    this.classroomName = classroomName;
    this.joinCode = joinCode;
    this.createdBy = createdBy;
    this.creatorName = creatorName;
    this.createdAt = createdAt;
  }
}

module.exports = Classroom;
