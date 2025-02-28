class CheckIfLastTeacher {
    constructor(classroomRepository) {
      this.classroomRepository = classroomRepository;
    }
  
    async execute(classroom_id) {
      const teacherCount = await this.classroomRepository.countTeachersInClassroom(classroom_id);
      return teacherCount === 1;
    }
  }
  
  module.exports = CheckIfLastTeacher;
  