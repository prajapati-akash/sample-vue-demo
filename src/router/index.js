import { createRouter, createWebHistory } from 'vue-router'
import Home from '../view/Home.vue'
import StudentForm from '../view/StudentProfile.vue'
import UserProfile from '../view/UserProfile.vue'
import StudentList from '../view/Profile/List.vue'
import pageNotFound from '../view/PageNotFound.vue'
import MRSVendorRegistration from '../view/MRSVendorRegistration.vue'
import Login from '@/view/Login.vue'


const routes = [
  {
    path: "/home",
    name : "home",
    component: Home,
  },
  {
    path: "/",
    name : "login",
    component: Login,
  },
  {
    path: "/list",
    name : "StudentList",
    component: StudentList,
  },
  {
    path: "/student/add",
    name : "addStudent",
    component: StudentForm,
  },
  {
    path : "/user-profile",
    name : "user_profile",
    component : UserProfile,
  },
  {
    path : '/mrs-vendor-registration',
    name : "mrs_vendor_registration",
    component : MRSVendorRegistration
  },
  {
    path : '/:pathMatch(.*)*',
    name : pageNotFound,
    component : pageNotFound
  }
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;