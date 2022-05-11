import { All } from "..";

export default [
  {
    path: "",
    component: () => import("@/views/website/pages"),
    children: [
      {
        path: "",
        name: "website home",
        component: () => import("@/views/website/pages/home"),
        meta: () => ({
          title: "الرئيسية",
          roles: [All],
        }),
      },
    ],
  },
];
