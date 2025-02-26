class GetUserClassrooms {
    constructor(classroomRepository) {
        this.classroomRepository = classroomRepository;
    }

    async execute(userId) {
        if (!userId) {
            throw new Error("User ID is required");
        }
        return this.classroomRepository.loadAllClassrooms(userId);
    }
}
  
module.exports = GetUserClassrooms;
  