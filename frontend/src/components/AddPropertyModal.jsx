import { useAuth0 } from "@auth0/auth0-react";
import { Container, Modal, Stepper } from "@mantine/core";
import { useState } from "react";
import AddLocation from "./AddLocation";
import UploadImage from "./UploadImage";
import BasicDetails from "./BasicDetails";
import Facilities from "./Facilities";

const AddPropertyModal = ({ opened, setOpened }) => {
  const [active, setActive] = useState(0);
  const { user } = useAuth0();

  const [propertyDetail, setPropertyDetail] = useState({
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

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"34rem"} w={"100%"}>
        <>
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step label="Location" description="Address">
              <AddLocation
                nextStep={nextStep}
                propertyDetail={propertyDetail}
                setPropertyDetail={setPropertyDetail}
              />
            </Stepper.Step>
            <Stepper.Step label="Image" description="Upload">
              <UploadImage
                prevStep={prevStep}
                nextStep={nextStep}
                propertyDetail={propertyDetail}
                setPropertyDetail={setPropertyDetail}
              />
            </Stepper.Step>
            <Stepper.Step label="Basic" description="Details">
              <BasicDetails
                prevStep={prevStep}
                nextStep={nextStep}
                propertyDetail={propertyDetail}
                setPropertyDetail={setPropertyDetail}
              />
            </Stepper.Step>
            <Stepper.Step label="Facilities" description="Details">
              <Facilities
                prevStep={prevStep}
                propertyDetail={propertyDetail}
                setPropertyDetail={setPropertyDetail}
                setOpened={setOpened}
                setActiveStep={setActive}
              />
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
        </>
      </Container>
    </Modal>
  );
};

export default AddPropertyModal;
