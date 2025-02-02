import "./Tools.css"
const Tools=()=>{
    return(
        <section className="contenido Tools">
            <div className="titulos sec0-to">
                <i className="bi bi-archive"></i>
                <span>Tools</span>
            </div>
            <div className="sec1-to">
                <p>Presentation in Spanish</p>
                <iframe class="pdf-container" src={"https://drive.google.com/file/d/1zcPhBvi7UQ88dXtx8Sux-dpSxCfHiXBe/preview"}/>
            </div>
            <div className="sec2-to">
                <p>Presentation in English</p>
                <iframe class="pdf-container" src={"https://drive.google.com/file/d/1Sn7gxBTTJNh6Hs2K5fn48bNKgoDAr5iI/preview"}/>
            </div>
        </section>
    )
}

export default Tools