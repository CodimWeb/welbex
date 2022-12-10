import { useState } from "react";


const Input = ({ type, label, error, handleChange }) => {

    const [isFocus, setFocus] = useState(false)

    return (
        <div className="input-field">
            <input type={type}
                   id={label}
                   className={`${error.hasError ? 'invalid' : ''}`}
                   onChange={(e) => {handleChange(e.target.value)}}
            />
            <label htmlFor={label}>{label}</label>
            {error.hasError && <span className="helper-text" data-error={error.errorMessage} data-success="right"></span>}

        </div>
    )
}

export default Input;
