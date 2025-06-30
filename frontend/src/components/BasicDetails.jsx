import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../utils/common";

const BasicDetails = ({
  prevStep,
  nextStep,
  propertyDetail,
  setPropertyDetail,
}) => {
  const form = useForm({
    initialValues: {
      title: propertyDetail?.title,
      description: propertyDetail?.description,
      price: propertyDetail?.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 999 && value > 0 ? "Must be minimum 999 dolars" : null,
    },
  });
  const { title, description, price } = form.values;
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetail((prev) => ({ ...prev, title, description, price }));
      nextStep();
    }
  };
  return (
    <Box maw={"50%"} mx={"auto"} my={"md"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="Description"
          {...form.getInputProps("description")}
        />

        <NumberInput
          withAsterisk
          label="Price"
          placeholder="999"
          min={0}
          {...form.getInputProps("price")}
        />

        <Group justify="center" mt={"xl"}>
          <Button variant="default" onClick={prevStep}>
            Go Back
          </Button>
          <Button type="submit">Next Step</Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
