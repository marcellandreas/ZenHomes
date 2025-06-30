import React from "react";
import { Avatar, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="User Image" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item onClick={() => navigate("/favourites", { replace: true })}>
          Favourites
        </Menu.Item>
        <Menu.Item onClick={() => navigate("/bookings", { replace: true })}>
          Bookings
        </Menu.Item>
        <Menu.Label>Go Back</Menu.Label>
        <Menu.Item
          color="red"
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
