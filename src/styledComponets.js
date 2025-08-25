// styledComponents/ContactForm.js
import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

export const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid ${(props) => (props.hasError ? "#dc3545" : "#ddd")};
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => (props.hasError ? "#dc3545" : "#007bff")};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.hasError ? "rgba(220, 53, 69, 0.25)" : "rgba(0, 123, 255, 0.25)"};
  }
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 14px;
  margin-top: 4px;
  display: block;
`;

export const SubmitButton = styled.button`
  background-color: ${(props) => (props.isValid ? "#007bff" : "#6c757d")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: ${(props) => (props.isValid ? "pointer" : "not-allowed")};
  align-self: flex-start;
  opacity: ${(props) => (props.isValid ? 1 : 0.6)};

  &:hover {
    background-color: ${(props) => (props.isValid ? "#0056b3" : "#6c757d")};
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 30px;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

export const TableHeader = styled.th`
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;

  &.empty-state {
    text-align: center;
    color: #666;
    font-style: italic;
  }
`;
