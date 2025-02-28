class ClassroomController {
  constructor(createClassroom, joinClassroom, assignTestToClassroom, getUserClassrooms) {
    this.createClassroom = createClassroom;
    this.joinClassroom = joinClassroom;
    this.assignTestToClassroom = assignTestToClassroom;
    this.getUserClassrooms = getUserClassrooms;
  }

  async create(req, res) {
    try {
      const { classroom_name, created_by } = req.body;
      const classroom = await this.createClassroom.execute({ classroom_name, created_by });
      res.status(201).json(classroom);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async join(req, res) {
    try {
      const { user_id, join_code, role } = req.body;
      const result = await this.joinClassroom.execute({ user_id, join_code, role });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async assignTest(req, res) {
    try {
      const { classroom_id, test_id } = req.body;
      const result = await this.assignTestToClassroom.execute({ classroom_id, test_id });
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getClassroomsForUser(req, res) {
    try {
      const { user_id } = req.params;
      const classrooms = await this.getUserClassrooms.execute(user_id);
      res.status(200).json(classrooms);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ClassroomController;
