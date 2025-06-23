import * as yup from 'yup';

export const userProfileUpdateValidation = yup.object({
    names: yup
        .string()
        .required('Dato requerido')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, 'Solo letras y espacios'),
    paternalLastname: yup
        .string()
        .required('Dato requerido')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, 'Solo letras y espacios'),
    maternalLastname: yup
        .string()
        .required('Dato requerido')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, 'Solo letras y espacios'),
    email: yup
        .string()
        .required('Dato requerido')
        .email('Correo inválido'),
    cellphone: yup
        .string()
        .required('Dato requerido')
        .matches(/^[0-9]{9}$/, 'Debe tener 9 dígitos'),
    documentTypeId: yup
        .string()
        .required('Dato requerido'),
    documentNumber: yup
        .string()
        .required('Dato requerido'),
});
