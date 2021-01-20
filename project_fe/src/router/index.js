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
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
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
