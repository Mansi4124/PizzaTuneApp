// src/components/AdminMenuWithAddAndUpdate.js

import React from "react";
import { Card, Button } from "react-bootstrap";
import "./AdminMenuWithAdd&Update.css"; // Import the CSS file
import { redirect, useNavigate } from "react-router-dom";
import m1 from "../../assets/m1.png";
import m2 from "../../assets/m2.png";
import AdminMenu from "../AdminMenu/Adminmenu";
import AdminNav from '../Admin/AdminNav/AdminNav';
const AdminMenuWithAddAndUpdate = () => {
  const navigate = useNavigate();
  const handleAddItem = () => {
    navigate("/add-menu");
  };

  const handleUpdateItem = () => {
    navigate("/admin-menu");
  };

  return (
    <>
    <AdminNav/>
      <div className="container-admin container mt-5">
        <div className="row">
          {/* Add Item Card */}
          <div className="col-md-6 mb-4">
            <Card className="admin-menu-card">
              <Card.Img
                variant="top"
                src={m1}
                className="admin-menu-card-img"
              />
              <Card.Body className="admin-menu-card-body">
                <Card.Title className="admin-menu-card-title">
                  Add New Item
                </Card.Title>
                <Card.Text className="admin-menu-card-text">
                  Add new items to the menu with all the details.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={handleAddItem}
                  className="admin-menu-button"
                >
                  Add Item
                </Button>
              </Card.Body>
            </Card>
          </div>

          {/* Update Item Card */}
          <div className="col-md-6 mb-4">
            <Card className="admin-menu-card">
              <Card.Img src={m2} className="admin-menu-card-img" />
              <Card.Body className="admin-menu-card-body">
                <Card.Title className="admin-menu-card-title">
                  Update Existing Item
                </Card.Title>
                <Card.Text className="admin-menu-card-text">
                  Update details of existing items in the menu.
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={handleUpdateItem}
                  className="admin-menu-button"
                >
                  Update Item
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenuWithAddAndUpdate;
