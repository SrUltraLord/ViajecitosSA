import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import LoginPage from "./../pages/LoginPage.vue";

const routes: RouteRecordRaw[] = [
  { path: "", redirect: { name: "auth" } },
  { path: "/auth", name: "auth", component: LoginPage },
  {
    path: "/home",
    name: "home",
    redirect: { name: "home-search" },
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: { name: "home-search" } },
      {
        path: "/home/search",
        name: "home-search",
        component: () => import("../pages/SearchFlightPage.vue"),
      },
      {
        path: "/home/my-flights",
        name: "home-my-flights",
        component: () => import("../pages/MyFlightsPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;