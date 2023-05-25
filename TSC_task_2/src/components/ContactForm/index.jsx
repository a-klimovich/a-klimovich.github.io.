import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { initialValues, validation } from "./config";
const { TextArea } = Input;

const useContactForm = () => {
  const [formState, setFormState] = useState(initialValues);

  const validateField = (fieldName, value) => {
    const fieldRules = validation[fieldName];

    if (fieldRules.required && value === "") {
      return `To pole jest wymagane.`;
    } else if (fieldRules.max && value.length > fieldRules.max) {
      return `To pole może zawierać maksymalnie ${fieldRules.max} znaków.`;
    } else if (fieldRules.min && value.length < fieldRules.min) {
      return `To pole musi zawierać co najmniej ${fieldRules.min} znaków.`;
    } else if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
      return `Wprowadź poprawną wartość.`;
    }

    return undefined; // No error
  };

  const handleInputChange = (fieldName, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate all fields
    const errors = {};
    Object.keys(formState).forEach((fieldName) => {
      const fieldValue = formState[fieldName];
      const error = validateField(fieldName, fieldValue);
      if (error) {
        errors[fieldName] = error;
      }
    });

    if (Object.keys(errors).length > 0) {
      // If there are errors, stop form submission
      return;
    }

    // Execute the request or other code handling form submission
    console.log("Wysłano formularz:", formState);

    // Clear the form
    setFormState(initialValues);
  };

  return { formState, handleInputChange, handleSubmit };
};

const ContactForm = () => {
  const { formState, handleInputChange, handleSubmit } = useContactForm();

  return (
    <Form layout='vertical' onFinish={handleSubmit}>
      <Form.Item
        label='Imię'
        validateStatus={formState.firstName ? "error" : ""}
        help={formState.firstName && "To pole jest wymagane."}
        required>
        <Input
          value={formState.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          maxLength={validation.firstName.max}
        />
      </Form.Item>

      <Form.Item
        label='Nazwisko'
        validateStatus={formState.lastName ? "error" : ""}
        help={formState.lastName && "To pole jest wymagane."}
        required>
        <Input
          value={formState.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          maxLength={validation.lastName.max}
        />
      </Form.Item>

      <Form.Item
        label='Email'
        validateStatus={formState.email ? "error" : ""}
        help={formState.email && "To pole jest wymagane."}
        required>
        <Input value={formState.email} onChange={(e) => handleInputChange("email", e.target.value)} />
      </Form.Item>

      <Form.Item
        label='Numer telefonu'
        validateStatus={formState.phone ? "error" : ""}
        help={formState.phone && "To pole jest wymagane."}
        required>
        <Input
          value={formState.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          maxLength={validation.phone.max}
        />
      </Form.Item>

      <Form.Item
        label='Wiadomość'
        validateStatus={formState.message ? "error" : ""}
        help={formState.message && "To pole jest wymagane."}>
        <TextArea
          value={formState.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          maxLength={validation.message.max}
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </Form.Item>

      <Form.Item
        validateStatus={formState.privacyPolicy ? "error" : ""}
        help={formState.privacyPolicy && "Musisz zaakceptować politykę prywatności."}
        required>
        <Checkbox
          checked={formState.privacyPolicy}
          onChange={(e) => handleInputChange("privacyPolicy", e.target.checked)}>
          Akceptuję politykę prywatności
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Wyślij
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
