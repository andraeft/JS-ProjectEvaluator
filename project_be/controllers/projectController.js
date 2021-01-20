const express = require('express')
const bodyParser = require('body-parser')

const database = require('../model/database')
const { use } = require('../routers/projectrouter')

const app = express()
app.use(bodyParser.json())

// app.post('/sync', 
const sync = async (req, res, next) => {
    try {
        console.log('sync........')
        await database.sequelize.sync({force : true})
        res.status(201).json({message : 'created'})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

// get /projects?filter=aaa&pageSize=10&page=1
const getProjects = async (req, res, next) => {
    try {
        let filter = req.query.filter ? req.query.filter : ''
        let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10
        let page = req.query.page ? parseInt(req.query.page) : 0
        let projects
        if (page || filter){
            projects = await database.Project.findAll({
                where : {
                    maker : {
                        [Op.like] : `%${filter}%`
                    }
                },
                limit : pageSize,
                offset : page * pageSize
            })
        }
        else{
            projects = await database.Project.findAll()
        }
        res.status(200).json(projects)
    } catch (err) {
        next(err)
    }    
}

// app.post('/projects')
const addProject = async (req, res, next) => {
    try {
        console.log('===================');
        console.log(req.body);
        await database.Project.create(req.body.project).then(response => {
            console.log("PROJECT INSERTED: " + JSON.stringify(response));
            database.ProjectRole.create({userId: req.body.userId, projectId: response.id, role: "MP"})
        });
        res.status(201).json({message : 'created'})
    } catch (err) {
        next(err)
    }    
}

// app.get('/projects/:id', async 
const getProjectById = async (req, res, next) => {
    try {
        let project = await database.Project.findByPk(req.params.id)
        if (project){
            res.status(200).json(project)    
        }
        else{
            res.status(404).json({message : 'not found'})   
        }
    } catch (err) {
        next(err)
    }    
}

// app.put('/projects/:id', async
const updateProject = async (req, res, next) => {
    try {
        let project = await database.Project.findByPk(req.params.id)
        if (project){
            await project.update(req.body)
            res.status(202).json({message : 'accepted'})    
        }
        else{
            res.status(404).json({message : 'not found'})   
        }
    } catch (err) {
        next(err)
    }        
}

// app.delete('/projects/:id', async 
const deleteProject = async (req, res, next) => {
    console.log(req.params.id);
    try {
        let project = await database.Project.findByPk(req.params.id)
        if (project){
            await project.destroy()
            res.status(202).json({message : 'accepted'})    
        }
        else{
            res.status(404).json({message : 'not found'})   
        }
    } catch (err) {
        next(err)
    }        
}

const getProjectRole = async (req, res, next) => {
    try {
        let role = await database.ProjectRole.findOne({ where: { userId: req.params.userId, projectId: req.params.projectId } });
        console.log(role);
        if (role){
            res.status(200).json(role.dataValues)    
        }
        else{
            res.status(404).json({message : 'not found'})   
        }
    } catch (err) {
        next(err)
    }    
}

const generateJury = async (req, res, next) => {
    try {
        // select * from users, projectrole where id == userid and projectId !== req.body
        // let userIds = await database.User.findAll({where: {projectId : { [database.Op.ne]: req.params.projectId}}, attributes: ['userId'], include: [projectRole]});
        //let userIds = await database.User.findAll({ include: {model: database.ProjectRole, where: {projectId : { [database.Op.ne]: req.params.projectId}}}});
        let userIds = await database.User.findAll({attributes: ['id'], where: {id : { [database.Op.ne]: req.params.userId}}});
        userIds = userIds.map(x => x.id);
        console.log("!!!!!!!!!!!");
        shuffle(userIds);
        for (let i = 0; i < 2; i++){
            database.ProjectRole.create({userId: userIds[i], projectId: req.params.projectId, role: 'EVAL'})
        }
        console.log(userIds);
        res.status(200).json(userIds);
    } catch (err) {
        next(err)
    }
}

const getProjectJury = async (req, res, next) => {
    try {
        let jury = await database.ProjectRole.findAll({where: {projectId: req.params.projectId}});
        if (jury) {
            res.status(200).json(jury);
        }
    } catch (err){
        next(err)
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

module.exports = {
    getProjects,
    addProject,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectRole,
    generateJury,
    getProjectJury,
    sync
  }