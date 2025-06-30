import { Button, Group } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadImage = ({
  prevStep,
  nextStep,
  propertyDetail,
  setPropertyDetail,
}) => {
  const [imageURL, setImageURL] = useState(propertyDetail.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handleNext = () => {
    setPropertyDetail((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "drpittkxd",
        uploadPreset: "abehbuncei",
        maxFiles: 1,
      },
      (err, results) => {
        if (results.event === "success") {
          setImageURL(results.info.secure_url);
        }
      }
    );
  }, []);
  return (
    <div className="mt-12 flexCenter flex-col">
      {!imageURL ? (
        <div
          onClick={() => {
            widgetRef.current?.open();
          }}
          className=" flexCenter flex-col w-3/4 h-[21rem] border-dashed border-2 cursor-pointer"
        >
          <MdOutlineCloudUpload size={44} color="gray" />
        </div>
      ) : (
        <div
          onClick={() => {
            widgetRef.current?.open();
          }}
          className="w-3/4 h-[21rem] rounded-xl overflow-hidden cursor-pointer"
        >
          <img
            src={imageURL}
            alt="upload image"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <Group justify="center" mt="xl">
        <Button onClick={prevStep}>Go Back</Button>
        <Button onClick={handleNext} disabled={!imageURL}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
