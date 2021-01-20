const express = require('express')
const projectController = require('../controllers/projectcontroller')
const userController = require('../controllers/usercontroller')

const router = express.Router()

router.get('/sync', projectController.sync)

router.get('/projects', projectController.getProjects)

router.post('/projects', projectController.addProject)

router.get('/projects-user/:userId', projectController.getProjectByUserId)

router.get('/projects/:id', projectController.getProjectById)

router.put('/projects/:id', projectController.updateProject)

router.delete('/projects/:id', projectController.deleteProject)

router.post('/users', userController.addUser)

router.put('/users', userController.checkUser)

router.get('/project-role/:userId/:projectId', projectController.getProjectRole)

router.post('/generate-jury/:userId/:projectId', projectController.generateJury);

router.get('/jury/:projectId', projectController.getProjectJury);

router.get('/projects-jury/:userId', projectController.gettAllEvaluationProjectsByUserId);

router.post('/grades', projectController.addGrade);

router.put('/grades', projectController.addGrade);

router.get('/grade/:userId/:projectId', projectController.getGrade);

router.post('/stop/:projectId', projectController.stopEvaluation)

module.exports = router