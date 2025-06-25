import { Button, Modal } from "@mantine/core";
import React, { useContext, useState } from "react";
import { DatePicker } from "@mantine/dates";
import { useMutation } from "@tanstack/react-query";
import UserDetailContext from "../context/userDetailContext";
import { bookVisit } from "../utils/api";
import { toast } from "react-toastify";
import { RotateLoader } from "react-spinners";
import dayjs from "dayjs";

const BookingModal = ({ opened, setOpened, email, propertyId }) => {
  const [value, setValue] = useState(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handlleBookingSuccess = () => {
    toast.success("Your have booked the visit", { position: "bottom-right" });
    setUserDetails((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings,
        {
          id: propertyId,
          date: dayjs(value).format("DD/MM/YYYY"),
        },
      ],
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookVisit(value, propertyId, email, token),
    onSuccess: () => handlleBookingSuccess(),
    onError:
      () =>
      ({ response }) =>
        toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Select Your date visit"
      centered
    >
      <div className="flexCenter flex-col gap-4">
        <DatePicker value={value} onChange={setValue} minDate={new Date()} />
        <Button
          disabled={!value || isLoading}
          onClick={() => {
            mutate();
          }}
        >
          Book Visit
        </Button>
      </div>
    </Modal>
  );
};

export default BookingModal;
