import Vue from "vue";
import VueRouter from "vue-router";
import MyProjects from "../views/MyProjects.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "MyProjects",
    component: MyProjects
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/add-project",
    name: "AddProject",
    component: () => import("../views/AddProject.vue")
  },
  {
    path: "/project/:id",
    name: "ProjectPage",
    component: () => import("../views/ProjectPage.vue")
  },
  {
    path: "/eval",
    name: "Evaluations",
    component: () => import("../views/Evaluations.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
