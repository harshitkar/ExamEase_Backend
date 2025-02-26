const JoinClassroom = require("./joinClassroom");

const generateRandomCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

class CreateClassroom {
  constructor(classroomRepository) {
    this.classroomRepository = classroomRepository;
  }

  async execute({ classroomName, createdBy }) {
    const joinCode = generateRandomCode();

    const classroom = await this.classroomRepository.createClassroom({
      classroomName,
      joinCode,
      createdBy,
    });

    const joinClassroomInstance = new JoinClassroom(this.classroomRepository);
    const newClassroom = await joinClassroomInstance.execute({
      userId: createdBy,
      joinCode,
      role: "teacher",
    });

    return newClassroom;
  }
}

module.exports = CreateClassroom;
