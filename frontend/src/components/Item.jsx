import { CgRuler } from "react-icons/cg";
import { FaHeart } from "react-icons/fa6";
import {
  MdOutlineBathroom,
  MdOutlineBed,
  MdOutlineGarage,
} from "react-icons/md";

const Item = ({ property }) => {
  return (
    <div className=" rounded-lg overflow-hidden bg-white ring-1 ring-slate-900/50">
      {/* image */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="h-[13rem] w-full aspect-square object-cover"
        />
        <div className=" absolute top-4 right-6">
          <FaHeart className=" text-white text-xl" />
        </div>
      </div>
      {/* info */}
      <div className="m-3">
        <div className="flexBetween">
          <h5 className="bold-16 my-1 text-secondary">{property.city}</h5>
          <h4 className="h4">${property.price}</h4>
        </div>
        <h4 className="medium-18 line-clamp-1">{property.title}</h4>
        <div className="flex gap-x-2 py-2">
          <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
            <MdOutlineBed /> {property.facilities.bedrooms}
          </div>
          <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
            <MdOutlineBathroom /> {property.facilities.bathrooms}
          </div>
          <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
            <MdOutlineGarage /> {property.facilities.parkings}
          </div>
          <div className="flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-medium">
            <CgRuler /> 400
          </div>
        </div>
        <p className="pt-2 mb-4 line-clamp-2">{property.description}</p>
      </div>
    </div>
  );
};

export default Item;
