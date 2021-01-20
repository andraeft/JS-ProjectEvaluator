
export async function getAllProjects() {

    const response = await fetch('/api/projects');
    return await response.json();
}

export async function createProject(project) {
    const data = { project: project, userId: -1};

    if (sessionStorage.getItem("user")){
        const user = JSON.parse(sessionStorage.getItem("user"));
        data.userId = user.id; 
    }

    const response = await fetch(`/api/projects`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
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

export async function generateJury(userId) {
    const response = await fetch(`/api/generate-jury`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: userId
      })
    return await response.json();
}