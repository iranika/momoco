import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Home.vue'),
        props: (route) => {
          const page = route.query.page;
          return {
            page: typeof page === 'string' ? page : '1',
          };
        },
        name: 'top',
      },

      {
        path: '/character',
        redirect: '/character/seri',
      },
      {
        path: '/character/:name',
        component: () => import('pages/Character.vue'),
        props: (route: { params: { name: string } }) => ({
          name: route.params.name,
        }),
      },
      {
        path: '/timeline',
        component: () => import('pages/Timeline.vue'),
      },
      {
        path: '/search',
        component: () => import('pages/Search.vue'),
      },
      {
        path: '/about',
        component: () => import('pages/About.vue'),
      },
      {
        path: '/settings',
        component: () => import('pages/ChooseHeader.vue'),
      },
      {
        path: '/dlsite',
        name: 'dlsite',
        component: () => import('pages/DLsite.vue'),
      },
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
