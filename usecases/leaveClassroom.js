class LeaveClassroom {
    constructor(classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    async execute({ user_id, classroom_id }) {
        const teacherCount = await this.classroomRepository.countTeachersInClassroom(classroom_id);
        const isLastTeacher = teacherCount === 1;
    
        if (isLastTeacher) {
            await this.classroomRepository.deleteClassroom(classroom_id);
            await this.classroomRepository.deleteUserAccount(user_id);
            return { message: "You were the last teacher. Classroom and your account have been deleted." };
        } else {
            await this.classroomRepository.removeUserFromClassroom(user_id, classroom_id);
            return { message: "You have left the classroom." };
        }
    }    
}

module.exports = LeaveClassroom;  