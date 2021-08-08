import * as yup from 'yup';
import {nameRegEx, phoneRegEx} from "../utils/regEx";
import {nameMessage, requiredMessage, phoneMessage, emailMessage, positiveNumberMessage, integerNumberMessage, numberMessage} from "../utils/messages";


function contactRequired(){
    return yup.object().shape(
        {
            firstName: yup.string().matches(nameRegEx, nameMessage).required(requiredMessage).trim(),
            lastName: yup.string().matches(nameRegEx, nameMessage).required(requiredMessage).trim(),
            phone: yup.string().matches(phoneRegEx, phoneMessage).required(requiredMessage).trim(),
            email: yup.string().email(emailMessage).required(requiredMessage).trim(),
        }
    )
}

export const companyFormValidationSchema = yup.object().shape({
    name: yup.string().matches(nameRegEx, nameMessage).required(requiredMessage).trim(),
    // country: yup.string().matches(countryRegEx,countryMessage).required(requiredMessage).trim(),
    country: yup.string().matches(nameRegEx,nameMessage).required(requiredMessage).trim(),
    city: yup.string().matches(nameRegEx, nameMessage).required(requiredMessage).trim(),
    address: yup.string().required(requiredMessage).trim(),
    zipCode: yup.number().positive(positiveNumberMessage).integer(integerNumberMessage).required(requiredMessage).typeError(numberMessage),

    admin: contactRequired(),
    itHead: contactRequired(),
    customerManager: contactRequired(),
});

// function contact(){
//     return yup.object().shape(
//         {
//             firstName: yup.string().when(['lastName', 'phone', 'email'], {
//                     is: (lastName: string|undefined, phone: string|undefined, email: string|undefined) => {
//                         return (!lastName) && (!phone) && (!email);
//                     },
//                     then: yup.string().notRequired(),
//                     otherwise: yup.string().matches(nameRegEx, nameMessage).required(requiredMessageContact).trim()
//                 }
//             ),
//             lastName: yup.string().when(
//                 ['firstName', 'phone', 'email'],{
//                     is: (firstName: string|undefined, phone: string|undefined, email: string|undefined) => {
//                         return (!firstName) && (!phone) && (!email);
//                     },
//                     then: yup.string().notRequired(),
//                     otherwise: yup.string().matches(nameRegEx, nameMessage).required(requiredMessageContact).trim()
//                 }
//             ),
//             phone: yup.string().when(
//                 ['firstName', 'lastName', 'email'],{
//                     is: (firstName: string|undefined, lastName: string|undefined, email: string|undefined) => {
//                         return (!firstName) && (!lastName) && (!email);
//                     },
//                     then: yup.string().notRequired(),
//                     otherwise: yup.string().matches(phoneRegEx, phoneMessage).required(requiredMessageContact).trim()
//                 }
//             ),
//             email: yup.string().when(
//                 ['firstName', 'lastName', 'phone'],{
//                     is: (firstName: string|undefined, lastName: string|undefined, phone: string|undefined) => {
//                         return (!firstName) && (!lastName) && (!phone);
//                     },
//                     then: yup.string().notRequired(),
//                     otherwise: yup.string().email(emailMessage).required(requiredMessageContact).trim()
//                 }
//             ),
//         }, [['firstName', 'lastName'],  ['firstName', 'phone'], ['firstName', 'email'], ['lastName', 'phone'],  ['lastName', 'email'], ['phone', 'email']]
//     )
// }
//
// export const companyFormValidationSchema = yup.object().shape({
//     name: yup.string().matches(nameRegEx, nameMessage).required(requiredMessage).trim(),
//     country: yup.string().matches(countryRegEx,countryMessage).required(requiredMessage).trim(),
//     city: yup.string().matches(nameRegEx, nameMessage).required(requiredMessage).trim(),
//     address: yup.string().required(requiredMessage).trim(),
//     zipCode: yup.number().positive(positiveNumberMessage).integer(integerNumberMessage).required(requiredMessage).typeError(numberMessage),
//
//     admin: contact(),
//     itHead: contact(),
//     customerManager: contact()
// });

/*
https://regex101.com/
https://regexr.com/
*/
//name: yup.string().matches(/^([aA-zZ]+\s?[aA-zZ]*)*[aA-zZ]+$/, 'Name should contain only letters. One space between letters is allowed').required('Name is a required field'),
