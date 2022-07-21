import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/Home.vue'),
        props: (route: { query: { page: string; }; }) => ({
          page: route.query.page
        }),
        name: 'top'
      },
      
      {
        path: '/charactor',
        redirect: '/charactor/seri'
      },
      {
        path: '/charactor/:name',
        component:() => import('pages/Charactor.vue'),
        props: (route: { params: { name: string; }; })=>({
          name: route.params.name
        })
      },
      {
        path: '/timeline',
        component:() => import('pages/Timeline.vue')
      },
      {
        path: '/search',
        component:() => import('pages/Search.vue')
      },
      {
        path: '/about',
        component:() => import('pages/About.vue')
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
