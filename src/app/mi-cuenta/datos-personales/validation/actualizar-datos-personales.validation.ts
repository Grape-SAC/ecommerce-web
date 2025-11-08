import * as yup from 'yup';

export const actualizarDatosPersonalesValidation = yup.object({
    nombres: yup
        .string()
        .required('Dato requerido')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, 'Solo letras y espacios'),
    apellidoPaterno: yup
        .string()
        .required('Dato requerido')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, 'Solo letras y espacios'),
    apellidoMaterno: yup
        .string()
        .required('Dato requerido')
        .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, 'Solo letras y espacios'),
    correo: yup
        .string()
        .required('Dato requerido')
        .email('Correo inválido'),
    celular: yup
        .string()
        .required('Dato requerido')
        .matches(/^[0-9]{9}$/, 'Debe tener 9 dígitos'),
    tipoDocumentoId: yup
        .string()
        .required('Dato requerido'),
    numeroDocumento: yup
        .string()
        .required('Dato requerido'),
});
