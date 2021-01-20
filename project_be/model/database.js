const Sequelize = require('sequelize')
const Op = Sequelize.Op

const sequelize = new Sequelize('project_db', 'root', 'parola123', {
    dialect : 'mariadb'
})

let Project = sequelize.define('project', {
    title : {
        type : Sequelize.STRING,
        allowNull : false
    },
    deliverables : {
        type : Sequelize.STRING,
        allowNull : false
    },
    dueDate : {
        type : Sequelize.DATE
    },
    videoUrl: {
        type: Sequelize.STRING
    },
    projectLink: {
        type: Sequelize.STRING
    },
    finalGrade: {
        type: Sequelize.INTEGER,
        allowNull : false
    }
})

let User = sequelize.define('user', {
    username : {
        type : Sequelize.STRING,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull: false
    },
    type : {
        type : Sequelize.ENUM,
        allowNull : false,
        values : ['STUDENT', 'PROF']
    }
}) 

let ProjectRole = sequelize.define('projectRole', {
    role : {
        type : Sequelize.ENUM,
        allowNull : false,
        values : ['EVAL', 'MP']
    }
})

let Grade = sequelize.define('grade', {
    grade : {
        type: Sequelize.INTEGER
    }
})

Project.hasMany(ProjectRole)
User.hasMany(ProjectRole)
Grade.belongsTo(User)
Grade.belongsTo(Project)
Project.belongsTo(User)

module.exports = {
    sequelize,
    Project,
    User,
    ProjectRole,
    Grade,
    Op
}