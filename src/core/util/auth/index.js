import useJwt from "@core/util/auth/jwt/useJwt";
import { All, Admin } from "@/router";
import jwt_decode from "jwt-decode";

import jwtDefaultConfig from "@core/auth/jwt/jwtDefaultConfig";
import {
  userRoleAttrName,
  userIdAttrName,
} from "@core/auth/jwt/jwtDefaultConfig";

export const isUserLoggedIn = () => {
  return (
    localStorage.getItem("userData") &&
    localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
  );
};

export const getUserData = () => {
  if (localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)) {
    return jwt_decode(
      localStorage.getItem(useJwt.jwtConfig.storageTokenKeyName)
    );
  }
};

export const canNavigate = (to) => {
  const userData = getUserData();
  if (typeof to.meta == "function") {
    return (
      to.meta(to).roles.indexOf(All) != -1 ||
      (userData && to.meta(to).roles.indexOf(userData[userRoleAttrName]) != -1)
    );
  }
  return true;
};

export const isAdmin = () => {
  if (localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)) {
    return (
      jwt_decode(localStorage.getItem(jwtDefaultConfig.storageTokenKeyName))[
        userRoleAttrName
      ] == Admin
    );
  }
  return false;
};
export const currentUserId = () => {
  if (localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)) {
    return +jwt_decode(
      localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)
    )[userIdAttrName];
  }
  return null;
};
export const currentUserRole = () => {
  if (localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)) {
    return jwt_decode(
      localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)
    )[userRoleAttrName];
  }
  return null;
};
export const getHomeRouteForLoggedInUser = () => {
  const userRole = currentUserRole()
  if (userRole === Admin) return "/admin";
  return "/";
};
