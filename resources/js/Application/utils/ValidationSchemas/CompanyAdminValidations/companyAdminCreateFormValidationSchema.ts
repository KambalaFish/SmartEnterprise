import * as yup from "yup";
import {nameRegEx, passwordRegEx, phoneRegEx} from "../utils/regEx";
import {
    emailMessage,
    nameMessage, passwordMessage,
    phoneMessage,
    requiredMessage
} from "../utils/messages";

export const companyAdminCreateFormValidationSchema = yup.object().shape({
    name: yup.string().required(requiredMessage).matches(nameRegEx, nameMessage).trim(),
    phoneNumber: yup.string().required(requiredMessage).matches(phoneRegEx, phoneMessage).trim(),
    email: yup.string().required(requiredMessage).email(emailMessage).trim(),
    password: yup.string().required(requiredMessage).matches(passwordRegEx, passwordMessage).trim(),
    passwordConfirmation: yup.string().required(requiredMessage)
        .oneOf([yup.ref('password')], 'Passwords must match'),
});
