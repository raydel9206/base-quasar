
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  },
  {
    path: "/examples",
    component: () => import("../layouts/MainLayout.vue"),
    name: "card",
    children: [
      {
        path: "card",
        component: () => import("components/Examples/card/card.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("components/Examples/card/components/cardView.vue"),
            name: "card",
          },
        ],
      }
    ],
  },
]

export default routes
