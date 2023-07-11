<script setup lang="tsx">
// import { RouterLink, RouterView } from 'vue-router'
import LayoutHeader from './components/layout/LayoutHeader.vue'
import LayoutMenu from './components/layout/LayoutMenu.vue'
import LayoutContent from './components/layout/LayoutContent.vue'

// const App = () => {
//   return (
//     <>
//     <template>
//   <div class="common-layout">
//     <el-container>
//       <el-header>Header</el-header>
//       <el-container>
//         <el-aside width="200px">Aside</el-aside>
//         <el-main>Main</el-main>
//       </el-container>
//     </el-container>
//   </div>
// </template>

//       <header>
//         <img alt="Vue logo" class={style.logo} src={imgSrc} width="125" height="125" />

//         <div class="wrapper">
//           <nav>
//             <RouterLink to="/">Home</RouterLink>
//             <RouterLink to="/about">About</RouterLink>
//           </nav>
//         </div>
//       </header>

//     </>
//   )
// }
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><LayoutHeader /></el-header>
      <el-container>
        <el-aside width="200px"><LayoutMenu /></el-aside>
        <el-main><LayoutContent /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
