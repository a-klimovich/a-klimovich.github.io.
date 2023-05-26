import { throwPromiseError } from "../../helpers/throwPromiseError";

export const initialValues = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  message: "",
  privacyPolicy: false,
};

export const validation = {
  name: {
    required: true,
    max: 32,
  },
  lastName: {
    required: true,
    max: 48,
  },
  email: {
    required: true,
    pattern: /^\S+@\S+\.\S+$/,
    message: "Niepoprawny format ${label}!",
  },
  phone: {
    required: true,
    validator: (_, value) => {
      const pattern = /\D/g;
      const isValueLength = value.length >= 6 && value.length <= 15;
      const isValueNumber = !pattern.test(value);

      if (!isValueLength) {
        return throwPromiseError("Długość powinna wynosić od 6 do 15!");
      }

      if (!isValueNumber) {
        return throwPromiseError("Niepoprawny format ${label}!");
      }

      return Promise.resolve();
    },
  },
  message: { max: 250 },
  privacyPolicy: (isChecked) => ({
    validator: () => {
      if (!isChecked) {
        return throwPromiseError("Pole polityki prywatności jest wymagane!");
      }

      return Promise.resolve();
    },
  }),
};
