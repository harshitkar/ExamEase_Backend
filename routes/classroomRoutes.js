const express = require("express");
const router = express.Router();

const ClassroomController = require("../controllers/ClassroomController");

const ClassroomRepository = require("../repositories/classroomRepository");
const CreateClassroom = require("../usecases/createClassroom");
const JoinClassroom = require("../usecases/joinClassroom");
const AssignTestToClassroom = require("../usecases/assignTestToClassroom");
const GetUserClassrooms = require("../usecases/getUserClassrooms");

const pool = require("../db/db");
const classroomRepository = new ClassroomRepository(pool);
const createClassroom = new CreateClassroom(classroomRepository);
const joinClassroom = new JoinClassroom(classroomRepository);
const assignTestToClassroom = new AssignTestToClassroom(classroomRepository);
const getUserClassrooms = new GetUserClassrooms(classroomRepository);

const classroomController = new ClassroomController(
  createClassroom,
  joinClassroom,
  assignTestToClassroom,
  getUserClassrooms
);

// Routes
router.post("/create", async (req, res) => {
  await classroomController.create(req, res);
});

router.post("/join", async (req, res) => {
  await classroomController.join(req, res);
});

router.post("/assign-test", async (req, res) => {
  await classroomController.assignTest(req, res);
});

router.get("/user/:user_id", async (req, res) => {
  await classroomController.getClassroomsForUser(req, res);
});

module.exports = router;
