class JoinClassroom {
  constructor(classroomRepository) {
    this.classroomRepository = classroomRepository;
  }

  async execute({ user_id, join_code, role }) {
    const classroom = await this.classroomRepository.findByJoinCode(join_code);

    if (!classroom) {
      throw new Error("Classroom not found");
    }

    return await this.classroomRepository.addUserToClassroom(user_id, classroom.id, role);
  }
}

module.exports = JoinClassroom;
