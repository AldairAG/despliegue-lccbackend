import "./TextInput.css"

const Input = ({ti,...props }) => {
    return (
        <div className={props.readOnly ? "blockTextInput" : "TextInput"}>
            <p className="textoM2">{ti}</p>
            <input {...props} />
        </div>
    )
}

export default Input