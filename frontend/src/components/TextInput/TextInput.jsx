import "./TextInput.css"

const TextInput = (props) => {
    return (
        <div className={props.block ? "blockTextInput" : "TextInput"}>
            <p className="textoM2">{props.ti}</p>
            <input type="text" value={props.value} onChange={(e) => props.setValue(e.target.value)} readOnly={props.block}
                placeholder={props.pl} />
        </div>
    )
}
export default TextInput