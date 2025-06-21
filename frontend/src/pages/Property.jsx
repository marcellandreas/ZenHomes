import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { getProperty } from "../utils/api";
import { PuffLoader } from "react-spinners";
import { FaHeart, FaLocationDot, FaStar } from "react-icons/fa6";
import {
  MdOutlineBathroom,
  MdOutlineBed,
  MdOutlineGarage,
} from "react-icons/md";
import { CgRuler } from "react-icons/cg";
import Map from "../components/Map";

const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isError, isLoading } = useQuery({
    queryKey: ["resd", id],
    queryFn: () => getProperty(id),
  });

  if (isLoading) {
    return (
      <div className=" h-64 flexCenter">
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#555"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <span>Error while fecthing property details</span>
      </div>
    );
  }

  return (
    <section className="max-padd-container my-[99px]">
      <div className=" relative pb-2">
        <img
          src={data?.image}
          alt={data?.title}
          className=" rounded-tr-3xl rounded-tl-3xl max-h-[27rem] w-full self-center object-cover aspect-square"
        />
        {/* like btn */}
        <div className=" absolute top-8 right-8">
          <FaHeart className="text-white text-xl" />
        </div>
      </div>
      {/* container */}
      <div className=" xl:flexBetween gap-8">
        {/* left side */}
        <div className="flex-1">
          <p className=" flexStart gap-x-2">
            <FaLocationDot />
            <span>
              {data?.address} {data?.city} {data?.country}
            </span>
          </p>
          <div className="flexBetween pt-3">
            <h4 className=" bold-20 line-clamp-1">{data?.title}</h4>
            <div className=" bold-20">{data?.price}.00</div>
          </div>
          <div className="flexBetween py-1 ">
            <h5 className="bold-12 my-1 text-secondary">{data?.city}</h5>
            <div className="flex items-baseline gap-2 text-secondary">
              <h4 className="bold-18 relative bottom-0.5 text-black">5.0</h4>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
          <div className=" flex gap-x-4">
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBed /> {data?.facilities.bedrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineBathroom /> {data?.facilities.bathrooms}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <MdOutlineGarage /> {data?.facilities.parkings}
            </div>
            <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]">
              <CgRuler /> 400
            </div>
          </div>
          <h4 className=" h4 mt-3">Property Details</h4>
          <p className="mb-4">{data?.description}</p>
          <div className="flexBetween pt-7">
            <button className=" btn-dark">book visit</button>
          </div>
        </div>
        {/* rigth side */}
        <div className="flex-1">
          <Map
            address={data?.address}
            city={data?.city}
            country={data?.country}
          />
        </div>
      </div>
    </section>
  );
};

export default Property;
