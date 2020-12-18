import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'
import Layout from './components/Layout'
import Home from './components/Home'
import StudentsManagement from './components/management/StudentsManagement'
import TeachersManagement from './components/management/TeachersManagement'
import CoursesManagement from './components/management/CoursesManagement'
import CourseInfoByStu from './components/query/CourseInfoByStu'
import CourseInfoByTeacher from './components/query/CourseInfoByTeacher'
import CourseInfoByAcademy from './components/query/CourseInfoByAcademy'
import TeacherInfoByAcademy from './components/query/TeacherInfoByAcademy'
import ClassesManagement from './components/management/ClassesManagement'
import MajorManagement from './components/management/MajorManagement'
import AcademyManagement from './components/management/AcademyManagement'
import ElectiveInfoByTermAndClass from './components/query/ElectiveInfoByTermAndClass'
import ElectiveManagement from './components/management/ElectiveManagement'
import Login from './components/Login'

Vue.use(VueRouter)
Vue.use(Antd)
Vue.prototype.$axios = axios

Vue.config.productionTip = false


const routes = [
  {
    path: '/',
    component: Login,
    meta: {
      title: '教务管理系统'
    }
  },
  {
    path: '/layout',
    component: Layout,
    meta: {
      title: '教务管理系统'
    },
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/students',
        component: StudentsManagement
      },
      {
        path: '/teachers',
        component: TeachersManagement
      },
      {
        path: '/courses',
        component: CoursesManagement
      },
      {
        path: '/classes',
        component: ClassesManagement
      },
      {
        path: '/majors',
        component: MajorManagement
      },
      {
        path: '/academies',
        component: AcademyManagement
      },
      {
        path: '/elective',
        component: ElectiveManagement
      },
      {
        path: '/query/course_info_by_stu',
        component: CourseInfoByStu
      },
      {
        path: '/query/course_info_by_teacher',
        component: CourseInfoByTeacher
      },
      {
        path: '/query/course_info_by_academy',
        component: CourseInfoByAcademy
      },
      {
        path: '/query/teachers_info_by_academy',
        component: TeacherInfoByAcademy
      },
      {
        path: '/query/elective_info_by_term_and_class',
        component: ElectiveInfoByTermAndClass
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
