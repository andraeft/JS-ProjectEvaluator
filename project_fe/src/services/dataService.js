
export function isLoggedIn(){
    if (sessionStorage.getItem("user")) {
        const user = JSON.parse(sessionStorage.getItem("user"));
        return user;
    }
    return null;
}

export async function getProjectRole(userId, projectId) {
    const response = await fetch('/api/project-role/' + userId + '/' + projectId);
    return await response.json();
}

export async function getAllProjects() {

    const response = await fetch('/api/projects');
    return await response.json();
}

export async function gettAllProjectsByUserId(id) {
    const response = await fetch('/api/projects-user/' + id);
    return await response.json();
}

export async function gettAllEvaluationProjectsByUserId(id) {
    const response = await fetch('/api/projects-jury/' + id); 
    return await response.json();
}

export async function createProject(project) {

    if (sessionStorage.getItem("user")){
        const user = JSON.parse(sessionStorage.getItem("user"));
        project.userId = user.id; 
    }

    const response = await fetch(`/api/projects`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(project)
      })
    return await response.json();
}

export async function getProjectById(id) {

    const response = await fetch('/api/projects/' + id);
    return await response.json();
}

export async function addUser(data) {

    const response = await fetch(`/api/users`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function checkUser(data) {

    const response = await fetch('/api/users/', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function generateJury(userId, projectId) {
    const response = await fetch(`/api/generate-jury/` + userId + '/' + projectId, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      })
    return await response.json();
}

export async function getJury(projectId) {
    const response = await fetch('/api/jury/' + projectId);
    return await response.json();
}

export async function submitGrade(data) {
    const response = await fetch(`/api/grades`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}

export async function getGrade(userId, projectId) {
    const response = await fetch('/api/grade/' + userId + '/' + projectId);
    return await response.json();
}

export async function stopEvaluation(projectId) {
    const response = await fetch(`/api/stop/` + projectId, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      })
    return await response.json();
}