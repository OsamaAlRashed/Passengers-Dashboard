import { All } from "@/router";
export default [
  {
    header: "menu",
  },
  {
    title: "home",
    to: "/home",
    roles: [All],
  },
  {
    title: "orders",
    to: "/orders",
    roles: [All],
  },
  {
    title: "admins",
    to: "/admins",
    roles: [All],
  },
  {
    title: "drivers",
    to: "/drivers",
    roles: [All],
  },
  {
    title: "shops",
    to: "/shops",
    roles: [All],
  },
  {
    title: "financial",

    roles: [All],
    children:[{
      title: "salaries",
      to: "/salaries",
      roles: [All],
    },
    {
      title: "imports",
      to: "/imports",
      roles: [All],
    },
    {
      title: "exports",
      to: "/exports",
      roles: [All],
    },
  ]
  },
  {
    title: "settings",
    to: "/settings",
    roles: [All],
  }
];
