import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [contacts, setContacts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For phone number, only allow numbers
    if (name === "phoneNumber") {
      const numbersOnly = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numbersOnly,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    // Check if contact already exists
    const isDuplicate = contacts.some(
      (contact) =>
        contact.firstName.toLowerCase() === formData.firstName.toLowerCase() &&
        contact.lastName.toLowerCase() === formData.lastName.toLowerCase() &&
        contact.phoneNumber === formData.phoneNumber
    );

    if (isDuplicate) {
      alert("This contact already exists!");
      return;
    }

    // Add contact to the list
    setContacts((prev) => [...prev, { ...formData, id: Date.now() }]);
    console.log("Form submitted:", formData);
    setFormData({ firstName: "", lastName: "", phoneNumber: "" });
  };

  // Check if all fields are filled
  const isFormValid =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.phoneNumber.trim();

  // Sort contacts alphabetically by last name, then first name
  const sortedContacts = [...contacts].sort((a, b) => {
    if (a.lastName.toLowerCase() !== b.lastName.toLowerCase()) {
      return a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());
    }
    return a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
  });

  const containerStyle = {
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
  };

  const titleStyle = {
    marginBottom: "20px",
    color: "#333",
  };

  const inputRowStyle = {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
  };

  const inputGroupStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "500",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  const submitButtonStyle = {
    backgroundColor: isFormValid ? "#007bff" : "#6c757d",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: isFormValid ? "pointer" : "not-allowed",
    alignSelf: "flex-start",
    opacity: isFormValid ? 1 : 0.6,
  };

  const tableStyle = {
    width: "100%",
    marginTop: "30px",
    borderCollapse: "collapse",
    border: "1px solid #ddd",
  };

  const thStyle = {
    backgroundColor: "#f8f9fa",
    padding: "12px",
    textAlign: "left",
    fontWeight: "600",
    border: "1px solid #ddd",
  };

  const tdStyle = {
    padding: "12px",
    border: "1px solid #ddd",
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Contact Form</h2>

      <div style={inputRowStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
      </div>

      <div style={inputRowStyle}>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={inputGroupStyle}></div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        style={submitButtonStyle}
        onMouseOver={(e) => {
          if (isFormValid) {
            e.target.style.backgroundColor = "#0056b3";
          }
        }}
        onMouseOut={(e) => {
          if (isFormValid) {
            e.target.style.backgroundColor = "#007bff";
          }
        }}
      >
        Submit
      </button>

      {/* Contacts Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>First Name</th>
            <th style={thStyle}>Last Name</th>
            <th style={thStyle}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {sortedContacts.map((contact) => (
            <tr key={contact.id}>
              <td style={tdStyle}>{contact.firstName}</td>
              <td style={tdStyle}>{contact.lastName}</td>
              <td style={tdStyle}>{contact.phoneNumber}</td>
            </tr>
          ))}
          {contacts.length === 0 && (
            <tr>
              <td
                colSpan="3"
                style={{
                  ...tdStyle,
                  textAlign: "center",
                  color: "#666",
                  fontStyle: "italic",
                }}
              >
                No contacts added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
