import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";
import UserDetailContext from "../context/userDetailContext";
import useProperties from "../hooks/useProperties";
import { createResidency } from "../utils/api";

const Facilities = ({
  prevStep,
  propertyDetail,
  setPropertyDetail,
  setOpened,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      bedrooms: propertyDetail?.bedrooms,
      parkings: propertyDetail?.parkings,
      bathrooms: propertyDetail?.bathrooms,
    },
    validate: {
      bedrooms: (value) =>
        value < 1 ? "Must have at least one bedrooms" : null,

      bathrooms: (value) =>
        value < 1 ? "Must have at least one bathroom" : null,
    },
  });
  const { bedrooms, parkings, bathrooms } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetail((prev) => ({
        ...prev,
        facilities: { bedrooms, parkings, bathrooms },
      }));
      mutate();
    }
  };

  // upload

  const { user } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency(
        {
          ...propertyDetail,
          facilities: { bedrooms, parkings, bathrooms },
        },
        token,
        user?.email
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSettled: () => {
      toast.success("Added Succesfully", { position: "bottom-right" });
      setPropertyDetail({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        image: null,
        facilities: {
          bedrooms: 0,
          bathrooms: 0,
          parkings: 0,
        },
        userEmail: user?.email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });
  return (
    <Box maw={"50%"} mx={"auto"} my={"md"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Bedrooms"
          min={0}
          {...form.getInputProps("bedrooms")}
        />
        <NumberInput
          withAsterisk
          label="No of Parkings"
          min={0}
          {...form.getInputProps("parkings")}
        />

        <NumberInput
          withAsterisk
          label="No of Bathrooms"
          min={0}
          {...form.getInputProps("bathrooms")}
        />

        <Group justify="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            Go Back
          </Button>
          <Button type="submit" disabled={isLoading} color="green">
            {isLoading ? "Submitting" : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
