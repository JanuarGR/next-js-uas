import Button from "@/components/atoms/Button";
import React from "react";

export default function Sidebar() {
return (
<>
<div id="layoutSidenav_nav">
  <nav
  className="sb-sidenav accordion sb-sidenav-dark"
  id="sidenavAccordion"
  >
  <div className="sb-sidenav-menu">
    <div className="nav">
      <div className="sb-sidenav-menu-heading">Menu</div>
      <Button type="link" className={["nav-link"]} href="/">
        <div className="sb-nav-link-icon"></div>
        Data Obat dan Tindakan
      </Button>
    </div>
  </div>
  <div className="sb-sidenav-footer">
    <div className="small">Logged in as:</div>
    Start Bootstrap
  </div>
</nav>
</div>
</>
);
}
