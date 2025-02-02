import "./TextInput.css"

const TextField = ({ ti, value, name, changeState,pl, block }) => {

    return (
        <div className={block ? "blockTextInput" : "TextInput"}>
            <p className="textoM2">{ti}</p>
            <input type="text"
                value={value}
                onChange={(e) => changeState(name, e.target.value)}
                readOnly={block}
                placeholder={pl} />
        </div>
    )
}

export default TextField