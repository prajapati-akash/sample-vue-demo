import { createRouter, createWebHistory } from "vue-router";
import Home from "@/view/Home.vue";
import StudentForm from "@/view/StudentProfile.vue";
import UserProfile from "@/view/UserProfile.vue";
import StudentList from "@/view/Profile/List.vue";
import pageNotFound from "@/view/PageNotFound.vue";
import MRSVendorRegistration from "@/view/MRSVendorRegistration.vue";
import Login from "@/view/Login.vue";
import Registration from "@/view/Registration.vue";
import AddNewCompany from "@/view/AddNewCompany.vue"
import TestAddNewCompany from "@/view/TestAddNewCompany.vue"
import { useAuthUser } from "@/store/auth.store";
import contactUs from '@/view/contactUs.vue'

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Registration,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/list",
    name: "StudentList",
    component: StudentList,
  },
  {
    path: "/student/add",
    name: "addStudent",
    component: StudentForm,
  },
  {
    path: "/user-profile",
    name: "userProfile",
    component: UserProfile,
  },
  {
    path: "/mrs-vendor-registration",
    name: "mrsVendorRegistration",
    component: MRSVendorRegistration,
  },
  {
    path: "/add-new-company",
    name: "addNewCompany",
    component: AddNewCompany,
  },
  {
    path: "/test-add-new-company",
    name: "TestAddNewCompany",
    component: TestAddNewCompany,
  },
  {
    path: "/contact-us",
    name: "contactUs",
    component: contactUs,
  },
  {
    path: "/:pathMatch(.*)*",
    name: pageNotFound,
    component: pageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const protectedRoutes = [
  "/",
  "/register",
]

router.beforeEach((to) => {
    const authStore = useAuthUser();
    const authRequired = !protectedRoutes.includes(to.path);

    if (authRequired && !authStore.user_logged_in) {
        return '/';
    }

    if (!authRequired && authStore.user_logged_in) {
      return '/home';
  }
})

export default router;
