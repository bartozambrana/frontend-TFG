import {useState} from 'react'

//Se pueden mandar las reglas de validación de los distintos campos y validarlos aquí si queremos, de forma
// que tendríamos una validación de campos dinámica.

// Aunque también se puede realizar la validación en el useEffect del formulario que establece.
export const useForm = (initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const handleInputChange = (e) =>{
        let value = e.target.value;
        if (e.target.type === 'checkbox')
            value = e.target.checked
        setValues({
            ...values, //Solo cambian algunas propiedades y no todas, luego las mantenemos.
            [e.target.name]: value
        });
    }

    const reset = () => {
        setValues(initialState)
    }

    return [values,handleInputChange,reset];

}