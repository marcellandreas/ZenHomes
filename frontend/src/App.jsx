import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Home from "./pages/home";

import Layout from "./components/Layout";
import Listing from "./pages/Listing";
import Bookings from "./pages/Bookings";
import Favourites from "./pages/Favourites";
import Property from "./pages/Property";
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/listing">
              <Route index element={<Listing />} />
              <Route index path=":propertyId" element={<Property />} />
            </Route>
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/favourites" element={<Favourites />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
