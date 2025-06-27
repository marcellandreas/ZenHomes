import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../context/userDetailContext";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../utils/api";
import useFavourites from "../hooks/useFavourites";
import useBookings from "../hooks/useBookings";
const Layout = () => {
  const { data: dataBooking } = useBookings(); // success
  const { data: dataFavourites } = useFavourites();

  // const [isReady, setIsReady] = useState(false);

  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  // useEffect(() => {
  //   if (Array.isArray(dataBooking)) {
  //     setUserDetails((prev) => ({
  //       ...prev,
  //       bookings: dataBooking,
  //     }));
  //     setIsReady(true); // ini bisa dipindah ke sini
  //   }
  // }, [dataBooking]);

  useEffect(() => {
    if (Array.isArray(dataBooking) && Array.isArray(dataFavourites)) {
      setUserDetails((prev) => ({
        ...prev,
        bookings: Array.isArray(dataBooking) ? dataBooking : prev.bookings,
        favourites: Array.isArray(dataFavourites)
          ? dataFavourites
          : prev.favourites,
      }));
      // setIsReady(true);
    }
  }, [dataBooking, dataFavourites]);

  useEffect(() => {
    const getTokenAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "http://localhost:4000",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("access_token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));
      mutate(res);
    };

    isAuthenticated && getTokenAndRegister();
  }, [isAuthenticated]);

  // if (!isReady) return <p>Loading...</p>;

  return (
    <>
      <div>
        <Header />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
