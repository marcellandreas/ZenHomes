import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import useAuthCheck from "../hooks/useAuthCheck";
import UserDetailContext from "../context/userDetailContext";
import { useMutation } from "@tanstack/react-query";
import { toFav } from "../utils/api";
import { checkFavourites, updateFavourite } from "../utils/common";

const HeartBtn = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, favourites },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavourite(id, prev.favourites),
      }));
    },
  });

  const handlelLike = () => {
    if (validateLogin()) {
      mutate();
      setHeartColor((prev) => (prev === "#8ac243" ? "white" : "#8ac243"));
    }
  };

  useEffect(() => {
    setHeartColor(() => checkFavourites(id, favourites));
  }, [favourites]);

  console.log(heartColor);
  return (
    <FaHeart
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handlelLike();
      }}
      size={23}
      className=" cursor-pointer drop-shadow-md"
    />
  );
};

export default HeartBtn;
