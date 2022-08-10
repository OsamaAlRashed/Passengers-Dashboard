import {
  Admin
} from "..";
// import { nullGuid } from "@core/util/global/index.js";
export default [{
    path: "",
    redirect: "/orders",
  },
  {
    path: "home",
    name: "admin home",
    components: {
      default: () => import("@/views/admin/home"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [{
        text: "home",
        active: true,
      }, ],
    }),
  },
  {
    path: "orders",
    name: "orders",
    components: {
      default: () => import("@/views/admin/orders"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [{
        text: "orders",
        active: true,
      }],
    }),
  },
  {
    path: "orders/:orderId",
    name: "order details",
    props: {
      default: true
    },
    components: {
      default: () => import("@/views/admin/orders/components/order-details.vue"),
      // action: () => import("@/views/admin/drivers/components/driver-details.vue"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [{
          text: "orders",
          active: false,
          to: '/orders'
        },
        {
          text: "orders details",
          active: true,
        }
      ],
    })
  },
  {
    path: "shops",
    name: "shops",
    components: {
      default: () => import("@/views/admin/shops"),
      // action: () => import("@/views/admin/shops/actions/nav-action"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [{
        text: "shops",
        active: true,
      }, ],
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
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [{
        text: "admins",
        active: true,
      }, ],
    }),
  },
  {
    path: "drivers",
    name: "drivers",
    components: {
      default: () => import("@/views/admin/drivers"),
      action: () => import("@/views/admin/drivers/components/manage-driver.vue"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [{
        text: "drivers",
        active: true,
      }],
    }),
  },
  {
    path: "drivers/:driverId",
    name: "driver details",
    props: {
      default: true
    },
    components: {
      default: () => import("@/views/admin/drivers/components/driver-details.vue"),
      // action: () => import("@/views/admin/drivers/components/driver-details.vue"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [{
          text: "drivers",
          active: false,
          to: '/drivers'
        },
        {
          text: "drivers details",
          active: true,
        }
      ],
    })
  },
  {
    path: "salaries",
    name: "salaries",
    components: {
      default: () => import("@/views/admin/salaries"),
      action: () => import("@/views/admin/salaries/components/manage-salary.vue"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [{
        text: "salaries",
        active: true,
      }, ],
    }),
  }, {
    path: "imports",
    name: "imports",
    components: {
      default: () => import("@/views/admin/imports"),
      action: () => import("@/views/admin/imports/components/add-import.vue"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [{
        text: "imports",
        active: true,
      }, ],
    }),
  }, {
    path: "exports",
    name: "exports",
    components: {
      default: () => import("@/views/admin/exports"),
      action: () => import("@/views/admin/exports/components/add-export.vue"),
    },
    meta: () => ({
      roles: [Admin],
      layout: "vertical",
      breadcrumb: [{
        text: "exports",
        active: true,
      }, ],
    }),
  },
];