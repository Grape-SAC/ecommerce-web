import * as yup from 'yup';

export const usuarioDireccionFormValidation = yup.object({
    departamentoId: yup
        .string()
        .required('Dato requerido'),
    provinciaId: yup
        .string()
        .required('Dato requerido'),
    distritoId: yup
        .string()
        .required('Dato requerido'),
    direccion: yup
        .string()
        .required('Dato requerido'),
    referencia: yup
        .string()
        .required('Dato requerido'),
});
