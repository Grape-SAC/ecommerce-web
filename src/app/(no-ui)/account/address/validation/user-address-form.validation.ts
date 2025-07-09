import * as yup from 'yup';

export const userAddressFormValidation = yup.object({
    departmentId: yup
        .string()
        .required('Dato requerido'),
    provinceId: yup
        .string()
        .required('Dato requerido'),
    districtId: yup
        .string()
        .required('Dato requerido'),
    address: yup
        .string()
        .required('Dato requerido'),
    reference: yup
        .string()
        .required('Dato requerido'),
});
