import { All } from "..";
// import { nullGuid } from "@core/util/global/index.js";
export default [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "home",
    name: "admin home",
    components: {
      default: () => import("@/views/admin/home"),
      action: () => import("@/views/admin/home/actions/nav-action"),
    },
    meta: () => ({
      roles: [All],
      layout: "vertical",
      breadcrumb: [
        {
          text: "home",
          active: true,
        },
      ],
    }),
  },
  {
    path: "shops",
    name: "shops",
    components: {
      default: () => import("@/views/admin/shops"),
      // action: () => import("@/views/admin/shops/actions/nav-action"),
    },
    meta: () => ({
      roles: [All],
      layout: "vertical",
      breadcrumb: [
        {
          text: "shops",
          active: true,
        },
      ],
    }),
  },
  {
    path: "admins",
    name: "admins",
    components: {
      default: () => import("@/views/admin/admins"),
      action: () => import("@/views/admin/admins/components/manage-admin.vue"),
    },
    meta: () => ({
      roles: [All],
      layout: "vertical",
      breadcrumb: [
        {
          text: "admins",
          active: true,
        },
      ],
    }),
  },
];
