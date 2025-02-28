class GetUserClassrooms {
    constructor(classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    async execute(user_id) {
        if (!user_id) {
            throw new Error("User ID is required");
        }
        return this.classroomRepository.loadAllClassrooms(user_id);
    }
}
  
module.exports = GetUserClassrooms;
  