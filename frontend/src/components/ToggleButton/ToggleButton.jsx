import "./ToggleButtons.css"
const ToggleButton = ({...children}) => {

    return (
        <label class="toggle-switch">
            <input type="checkbox" {...children} />
            <div class="toggle-switch-background">
                <div class="toggle-switch-handle"></div>
            </div>
        </label>
    )
}

export default ToggleButton 