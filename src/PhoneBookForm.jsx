import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Title,
  InputRow,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  Table,
  TableHeader,
  TableCell,
  ErrorMessage,
} from "./styledComponets";

export default function ContactForm() {
  const [contacts, setContacts] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data) => {
    // Check for duplicates
    const isDuplicate = contacts.some(
      (contact) =>
        contact.firstName.toLowerCase() === data.firstName.toLowerCase() &&
        contact.lastName.toLowerCase() === data.lastName.toLowerCase() &&
        contact.phoneNumber === data.phoneNumber
    );

    if (isDuplicate) {
      setError("root", {
        type: "duplicate",
        message: "This contact already exists!",
      });
      return;
    }

    // Clear any previous errors
    clearErrors("root");

    // Add contact
    setContacts((prev) => [...prev, { ...data, id: Date.now() }]);
    console.log("Form submitted:", data);
    reset();
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (a.lastName.toLowerCase() !== b.lastName.toLowerCase())
      return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());

    return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
  });

  return (
    <Container>
      <Title>Contact Form</Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputRow>
          <InputGroup>
            <Label>First Name:</Label>
            <Input
              type="text"
              {...register("firstName", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "First name can only contain letters and spaces",
                },
              })}
              hasError={!!errors.firstName}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>Last Name:</Label>
            <Input
              type="text"
              {...register("lastName", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters",
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "Last name can only contain letters and spaces",
                },
              })}
              hasError={!!errors.lastName}
            />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
          </InputGroup>
        </InputRow>

        <InputRow>
          <InputGroup>
            <Label>Phone Number:</Label>
            <Input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
                setValueAs: (value) => value.replace(/[^0-9]/g, ""),
              })}
              hasError={!!errors.phoneNumber}
            />
            {errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup></InputGroup>
        </InputRow>

        {errors.root && (
          <ErrorMessage style={{ marginBottom: "15px" }}>
            {errors.root.message}
          </ErrorMessage>
        )}

        <SubmitButton type="submit" disabled={!isValid} isValid={isValid}>
          Submit
        </SubmitButton>
      </form>

      <Table>
        <thead>
          <tr>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Phone Number</TableHeader>
          </tr>
        </thead>

        <tbody>
          {sortedContacts.map((contact) => (
            <tr key={contact.id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
            </tr>
          ))}

          {contacts.length === 0 && (
            <tr>
              <TableCell colSpan="3" className="empty-state">
                No contacts added yet
              </TableCell>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
