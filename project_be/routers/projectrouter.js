const express = require('express')
const projectController = require('../controllers/projectcontroller')
const userController = require('../controllers/usercontroller')

const router = express.Router()

router.get('/sync', projectController.sync)

router.get('/projects', projectController.getProjects)

router.post('/projects', projectController.addProject)

router.get('/projects/:id', projectController.getProjectById)

router.put('/projects/:id', projectController.updateProject)

router.delete('/projects/:id', projectController.deleteProject)

router.post('/users', userController.addUser)

router.put('/users', userController.checkUser)

router.get('/project-role/:userId/:projectId', projectController.getProjectRole)

router.post('/generate-jury/:userId/:projectId', projectController.generateJury);

router.get('/project-jury/:projectId', projectController.getProjectJury);

module.exports = router