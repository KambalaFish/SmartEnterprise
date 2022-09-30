import * as yup from 'yup';
import {emailMessage, requiredMessage} from "../utils/messages";

export const loginFormValidationSchema = yup.object().shape({
    email: yup.string().email(emailMessage).required(requiredMessage).trim(),
    password: yup.string().required(requiredMessage).trim()
})
