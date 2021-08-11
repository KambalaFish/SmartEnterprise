import * as yup from "yup";
import {nameRegEx, passwordRegEx, phoneRegEx} from "../utils/regEx";
import {
    emailMessage,
    nameMessage, passwordMessage,
    phoneMessage,
    requiredMessage
} from "../utils/messages";

export const companyAdminFormValidationSchema = yup.object().shape({
    firstName: yup.string().matches(nameRegEx, nameMessage).required(requiredMessage).trim(),
    lastName: yup.string().matches(nameRegEx, nameMessage).required(requiredMessage).trim(),
    phone: yup.string().matches(phoneRegEx, phoneMessage).required(requiredMessage).trim(),
    email: yup.string().email(emailMessage).required(requiredMessage).trim(),
    password: yup.string().matches(passwordRegEx, passwordMessage).required(requiredMessage).trim(),
    passwordConfirmation: yup.string().matches(passwordRegEx, passwordMessage).required(requiredMessage).trim(),
});
