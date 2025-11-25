import * as yup from 'yup';

export const iniciarSesionValidation = yup.object({
    usuario: yup.string()
        .required("Este campo es obligatorio"),
    clave: yup.string()
        .required("Este campo es obligatorio")
});