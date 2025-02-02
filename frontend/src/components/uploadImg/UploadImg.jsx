import { useState, useEffect } from "react"
import "./UploadImg.css"
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import img1 from "../../Assets/Images/Baners_jpg/user.png"
import AlertMsgError from "../AlertMsg/AlertMsgError";
import AlertMsg from "../AlertMsg/AlertMsg";

const UploadImg = (props) => {
    const [visible, setVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [visibleMsj, setVisibleMsj] = useState(false);
    const [visibleMsj1, setVisibleMsj1] = useState(false);
    const [msj, setMsj] = useState("")

    useEffect(() => {
        setVisible(props.visible);
    }, [props.visible]);

    const close = () => {
        setSelectedImage(null);
        setImageUrl("");
        props.setVisible(false);
        setVisible(false);
    }
    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        if (imageFile) {
            const imageUrl = URL.createObjectURL(imageFile);
            setSelectedImage(imageFile);
            setImageUrl(imageUrl);
        }
    };

    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleUploadToFirebase = () => {
        /*if (!imageUrl) {
            setMsj("You have not yet selected a profile image")
            setVisibleMsj(true)
        }*/
        const storage=getStorage()
        const storageRef = ref(storage, `imagesUp/${props.userName}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log("hola");
            },
            (error) => {
                console.error("Error uploading image:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setVisibleMsj1(true);  
                    setMsj("Your profile picture was successfully updated");
                    console.log('File available at', downloadURL);
                    setImageUrl(downloadURL);
                });

            });
    }

    return (
        visible && (
            <section className="UploadImg">
                <AlertMsgError visible={visibleMsj} setVisible={setVisibleMsj} texto={msj} />
                <AlertMsg visible={visibleMsj1} setVisible={setVisibleMsj1} texto={msj} />
                <div className="overlay-av"></div>
                <div className="UploadImg-content">
                    <div className="sec1-upi">
                        <p>Change profile photo</p>
                        <button onClick={close}><i className="bi bi-x"></i></button>
                    </div>
                    <div className="sec2-upi">
                        <img src={imageUrl || img1} alt="foto" />
                        <input id="fileInput" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                        {imageUrl ? (
                            <button onClick={handleUploadToFirebase}><i className="bi bi-upload"></i> Upload photo</button>
                        ) : (
                            <button onClick={handleUploadClick}><i className="bi bi-images"></i> Select photo</button>
                        )}
                    </div>
                    <div className="sec3-upi">
                        <button onClick={close}><p>Close</p></button>
                    </div>
                </div>
            </section>
        )
    );
}
export default UploadImg