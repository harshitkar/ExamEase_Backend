const JoinClassroom = require("./joinClassroom");

const generateRandomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

class CreateClassroom {
  constructor(classroomRepository) {
    this.classroomRepository = classroomRepository;
  }

  async execute({ classroom_name, created_by }) {
    const join_code = generateRandomCode();

    const classroom = await this.classroomRepository.createClassroom({
      classroom_name,
      join_code,
      created_by,
    });

    const joinClassroomInstance = new JoinClassroom(this.classroomRepository);
    const newClassroom = await joinClassroomInstance.execute({
      user_id: created_by,
      join_code,
      role: "teacher",
    });

    return newClassroom;
  }
}

module.exports = CreateClassroom;
