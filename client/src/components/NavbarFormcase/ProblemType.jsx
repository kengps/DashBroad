import { useState } from "react";
import { Form } from "react-bootstrap";

function MyForm() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [options, setOptions] = useState(["option1", "option2", "option3"]);

  const handleSelectChange = (event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
  };

  const handleAddOption = (event) => {
     event.preventDefault();
    const newOption = prompt("Enter new option:");
    if (newOption) {
      setOptions([...options, newOption]);
      setSelectedOption(newOption);
    }
  };

  return (
    <Form>
      <Form.Select value={selectedOption} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
      <button onClick={handleAddOption}>Add option</button>
    </Form>
  );
}


export default  MyForm;