import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Utility from "../../services/UtilityService";

const Sidebar = () => {
  const [superMenu, setSuperMenu] = useState({
    asset: false,
    leave: false,
    inventory: false,
    ticketing: false,
    settings: false,
  });
  const getSuper = (item, value) => {
    setSuperMenu((state) => ({
      ...state,
      [item]: !value,
    }));
  };

  let totalAsset =
    Utility.canAccess("asset", "add") ||
    Utility.canAccess("asset", "view") ||
    Utility.canAccess("asset", "del") ||
    Utility.canAccess("asset", "modify");

  let totalBranch =
    Utility.canAccess("branch", "add") ||
    Utility.canAccess("branch", "view") ||
    Utility.canAccess("branch", "del");

  let company = Utility.canAccess("company", "manage");
  let totalCategory =
    Utility.canAccess("category", "add") ||
    Utility.canAccess("category", "view") ||
    Utility.canAccess("category", "del");

  let totalDept =
    Utility.canAccess("department", "add") ||
    Utility.canAccess("department", "view") ||
    Utility.canAccess("department", "del");

  let totalPos =
    Utility.canAccess("pos", "sell") ||
    Utility.canAccess("pos", "view") ||
    Utility.canAccess("pos", "modify");

  let totalProduct =
    Utility.canAccess("product", "add") ||
    Utility.canAccess("product", "view") ||
    Utility.canAccess("product", "del");

  let totalStaff =
    Utility.canAccess("staff", "add") ||
    Utility.canAccess("staff", "view") ||
    Utility.canAccess("staff", "del") ||
    Utility.canAccess("staff", "modify");

  let totalLeave =
    Utility.canAccess("leave", "add") ||
    Utility.canAccess("leave", "view") ||
    Utility.canAccess("leave", "del");

  let totalTicket =
    Utility.canAccess("ticket", "create") ||
    Utility.canAccess("ticket", "manage");

  return (
    <Fragment>
      <ul className="sidebar_menu">
        <li>
          <Link to="/dashboard">
            <span className="icon">
              <i className="fa fa-dashboard" aria-hidden="true"></i>
            </span>
            <span className="title">Dashboard</span>
          </Link>
        </li>

        {totalAsset ? (
          <li className="super">
            <span className="icon">
              <i className="fa fa-product-hunt" aria-hidden="true"></i>
            </span>
            <span
              className="title"
              onClick={(e) => getSuper("asset", superMenu.asset)}
            >
              Asset<i className="fa fa-chevron-down caret"></i>
            </span>
            <ul className={`submenu ${superMenu.asset ? " show" : ""}`}>
              <li>
                <Link to="/asset">Manage Asset </Link>
              </li>
              {Utility.canAccess("asset", "view") ? (
                <li>
                  <Link to="/maintenance">Maintenance </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </li>
        ) : (
          ""
        )}
        <li>
          <Link to="/onboarding">
            <span className="icon">
              <i className="fa fa-hand-o-right" aria-hidden="true"></i>
            </span>
            <span className="title">Onboarding</span>
          </Link>
        </li>

        <li>
          <Link to="/vacations">
            <span className="icon">
              <i className="fa fa-hand-o-right" aria-hidden="true"></i>
            </span>
            <span className="title">My Vacations</span>
          </Link>
        </li>

        {totalPos || totalProduct ? (
          <Fragment>
            <li className="super">
              <span className="icon">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              </span>
              <span
                className="title"
                onClick={(e) => getSuper("inventory", superMenu.inventory)}
              >
                Inventory<i className="fa fa-chevron-down caret"></i>
              </span>
              <ul className={`submenu ${superMenu.inventory ? " show" : ""}`}>
                {totalProduct ? (
                  <li>
                    <Link to="/product">Product</Link>
                  </li>
                ) : (
                  ""
                )}
                {totalPos ? (
                  <li>
                    <Link to="/pos">pos</Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </li>
          </Fragment>
        ) : (
          ""
        )}
        {totalTicket ? (
          <Fragment>
            <li className="super">
              <span className="icon">
                <i className="fa fa-ticket" aria-hidden="true"></i>
              </span>
              <span
                className="title"
                onClick={(e) => getSuper("ticketing", superMenu.ticketing)}
              >
                Ticketing<i className="fa fa-chevron-down caret"></i>
              </span>
              <ul className={`submenu ${superMenu.ticketing ? " show" : ""}`}>
                {Utility.canAccess("ticket", "manage") ? (
                  <li>
                    <Link to="/admin/ticket">Admin </Link>
                  </li>
                ) : (
                  ""
                )}
                {Utility.canAccess("ticket", "create") ? (
                  <li>
                    <Link to="/ticket">Ticket </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </li>
          </Fragment>
        ) : (
          ""
        )}

        {totalStaff || totalLeave ? (
          <li className="super">
            <span className="icon">
              <i className="fa fa-product-hunt" aria-hidden="true"></i>
            </span>
            <span
              className="title"
              onClick={(e) => getSuper("leave", superMenu.leave)}
            >
              Admin<i className="fa fa-chevron-down caret"></i>
            </span>
            <ul className={`submenu ${superMenu.leave ? " show" : ""}`}>
              <li>
                <Link to="/vacation-applications">Vacation Applications </Link>
              </li>
              {totalStaff ? (
                <li>
                  <Link to="/staff"> Manage Staff </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </li>
        ) : (
          ""
        )}

        {totalCategory || totalBranch || totalDept || company ? (
          <li>
            <Link to="/settings">
              <span className="icon">
                <i className="fa fa-cog" aria-hidden="true"></i>
              </span>
              <span className="title">System</span>
            </Link>
          </li>
        ) : (
          ""
        )}
        {Utility.canAccess("report", "manage") ? (
          <li>
            <Link to="/report">
              <span className="icon">
                <i className="fa fa-bar-chart" aria-hidden="true"></i>
              </span>
              <span className="title">Report</span>
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </Fragment>
  );
};

export default Sidebar;
