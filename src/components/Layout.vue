<template>
  <div>
    <a-layout class="layout">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <a-menu theme="dark" mode="inline" :default-selected-keys="['0']">
          <a-menu-item key="0">
            <router-link to="/layout">
              <a-icon type="home" />
              <span>首页</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link to="/students">
              <a-icon type="user" />
              <span>学生管理</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link to="/teachers">
              <a-icon type="idcard" />
              <span>教师管理</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/courses">
              <a-icon type="profile" />
              <span>课程管理</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="4">
            <router-link to="/classes">
              <a-icon type="team" />
              <span>班级管理</span>
            </router-link>
          </a-menu-item>

          <a-menu-item key="elective">
            <router-link to="/elective">
              <a-icon type="bar-chart" />
              <span>选课管理</span>
            </router-link>
          </a-menu-item>

          <a-sub-menu key="sub-academy">
            <span slot="title">
              <a-icon type="build" /> <span>院系及专业管理</span>
            </span>
            <router-link to="/academies">
              <a-menu-item key="5">院系管理</a-menu-item>
            </router-link>
            <router-link to="/majors">
              <a-menu-item key="6">专业管理</a-menu-item>
            </router-link>
            <router-link to="/query/course_info_by_academy">
              <a-menu-item key="7">院系课程查询</a-menu-item>
            </router-link>
            <router-link to="/query/teachers_info_by_academy">
              <a-menu-item key="8">院系教师查询</a-menu-item>
            </router-link>
          </a-sub-menu>
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="select" /> <span>选课信息查询</span></span
            >
            <router-link to="/query/course_info_by_stu">
              <a-menu-item key="9"> 学生选课信息查询 </a-menu-item>
            </router-link>
            <router-link to="/query/course_info_by_teacher">
              <a-menu-item key="10"> 教师授课信息查询 </a-menu-item>
            </router-link>
            <router-link to="/query/elective_info_by_term_and_class">
              <a-menu-item key="11"> 班级成绩信息查询 </a-menu-item>
            </router-link>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <!-- 布局中的内容，子路由刷新 -->
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
    };
  },
};
</script>
<style>
.layout {
  height: 100vh;
}

.layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.layout .trigger:hover {
  color: #1890ff;
}

.layout .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
