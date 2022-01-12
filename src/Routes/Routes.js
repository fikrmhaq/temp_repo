import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect as Direct,
} from "react-router-dom";
// import { Theme } from '../Pages/Component's
import { ExportRoutes } from "./Routes.Configuration";
import "../index.css";
import SideBar from "../Pages/components/SideBar";
import NavBar from "../Pages/components/NavBar";
import "bootstrap/dist/js/bootstrap.bundle";
import NavBarResponsive from "../Pages/components/NavBarResponsive";
import SideBarResponsive from "../Pages/components/SideBarResponsive";

const Routes = ({ global, pathname }) => {
  return (
    <Router>
      {[null, ""].includes(localStorage.getItem("logged")) ? (
        <div>
            <ExportRoutes global={global} />
        </div>
      ) : (
        <div className="row m-0" style={{ height: "100vh" }}>
          <div className="col-lg-2 d-none d-cslg-block sidebar-container">
            <SideBar></SideBar>
          </div>
          <div className="col-lg-10 px-0 bg-main w-cslg-100 h-100 overflow-auto">
            <NavBar />
            <NavBarResponsive />
            <div className="d-cslg-flex">
              <SideBarResponsive />
              <div className="container-fluid my-3">
                <ExportRoutes global={global} />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Theme>s */}
      {/* <ExportRoutes global={global}/> */}
      {/* </Theme>s */}
    </Router>
  );
};

export default Routes;
