import * as yup from "yup";
import {nameRegEx, passwordRegEx, phoneRegEx} from "../utils/regEx";
import {
    emailMessage,
    nameMessage, passwordMessage,
    phoneMessage,
    requiredMessage
} from "../utils/messages";

export const companyAdminUpdateFormValidationSchema = yup.object().shape({
    name: yup.string().required(requiredMessage).matches(nameRegEx, nameMessage).trim(),
    phoneNumber: yup.string().required(requiredMessage).matches(phoneRegEx, phoneMessage).trim(),
    email: yup.string().required(requiredMessage).email(emailMessage).trim(),
    password: yup.string()
        .test('password',
            passwordMessage,
            (value, context) => {
            if (value!=undefined){
                if (value=='')
                    return true;
                return passwordRegEx.test(value);
            }
            return true;
        }).trim(),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match')

});
