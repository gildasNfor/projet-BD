/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// jshint esversion:6
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import CreateTontine from "views/examples/CreateTontine.js";
import MyTontines from "views/examples/MyTontines.js";
import UserDashboard from "views/examples/UserDashboard.js";
import Elections from "views/examples/Elections.js";

var routes = [
  {
    path: "/index",
    name: "Admin Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/app",
  },
  {
    path: "/index-user",
    name: "User Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: UserDashboard,
    layout: "/app",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/app",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/app",
  // },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/app",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/app",
  // },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/create-tontine",
    name: "Create Tontine",
    icon: "ni ni-money-coins",
    component: CreateTontine,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/my-tontines",
    name: "My Tontines",
    icon: "ni ni-credit-card",
    component: MyTontines,
    layout: "/auth",
  },
  {
    path: "/elections",
    name: "Elections",
    icon: "ni ni-credit-card",
    component: Elections,
    layout: "/auth",
  },
];
export default routes;
