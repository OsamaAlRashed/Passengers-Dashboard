import { All } from "@/router";
export default [
  {
    header: "menu",
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
    }]
  },
];
