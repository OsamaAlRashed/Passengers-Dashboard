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
    title: "admins",
    to: "/admins",
    roles: [All],
  },
  {
    title: "shops",
    to: "/shops",
    roles: [All],
  },
];
