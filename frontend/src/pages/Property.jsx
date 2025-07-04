import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { CgRuler } from "react-icons/cg";
import { FaLocationDot, FaStar } from "react-icons/fa6";
import {
  MdOutlineBathroom,
  MdOutlineBed,
  MdOutlineGarage,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import BookingModal from "../components/BookingModal";
import HeartBtn from "../components/HeartBtn";
import Map from "../components/Map";
import UserDetailContext from "../context/userDetailContext";
import useAuthCheck from "../hooks/useAuthCheck";
import { getProperty, removeBooking } from "../utils/api";

const Property = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { pathname } = useLocation();
  const { user } = useAuth0();
  const id = pathname.split("/").slice(-1)[0];

  const { data, isError, isLoading } = useQuery({
    queryKey: ["resd", id],
    queryFn: () => getProperty(id),
  });

  // mengambil token dan bookings yang ada di context
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);

  const { mutate: cancelBooking, isLoading: canceling } = useMutation({
    mutationFn: () => removeBooking(id, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== id),
      }));
      queryClient.invalidateQueries(["bookings"]);
      toast.success("Booking cancelled", { position: "bottom-right" });
    },
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
          <HeartBtn id={id} />
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
            {bookings?.some((booking) => booking?.id === id) ? (
              <>
                <Button
                  variant="outline"
                  color="red"
                  w={"100%"}
                  onClick={() => cancelBooking()}
                  disabled={canceling}
                >
                  Cancel Booking
                </Button>
                <p className="text-red-500 medium-15 ml-3">
                  You've already Booked visit for{" "}
                  {bookings?.filter((booking) => booking?.id === id)[0].date}
                </p>
              </>
            ) : (
              <Button
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}
                variant="filled"
                w={"50%"}
                color="black"
              >
                Book visit
              </Button>
            )}
            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={id}
              email={user?.email}
            />
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
