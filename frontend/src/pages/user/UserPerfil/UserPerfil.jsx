import { useState, useEffect, useRef } from "react"
import TextField from "../../../components/TextInput/TextField.jsx"
import Input from "../../../components/TextInput/Input.jsx"
import PhoneInput from "../../../components/PhoneInput/PhoneInput.jsx"

import "./UserPerfil.css"
import MensajeAlerta from "../../../components/AlertMsg/MensajeAlerta.jsx"
import SwitchFun from "../../../components/EditUser/InputData/SwitchFun.jsx"
import img1 from "../../../Assets/Images/Baners_jpg/user.png"
import UploadImg from "../../../components/uploadImg/UploadImg.jsx"
import TwoStepVerification from "../../../components/TwoStepVerification/TwoStepVerification.jsx"
import { useUser } from "../../../hooks/useUser.js"
import { changeStateLocal } from "../../../utils/helpers.js"
import { errorResponse } from "../../../helpers/erroresHelps.js"

const estados = {
    US: [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
        'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
        'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
        'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ],
    MX: [
        'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua',
        'Coahuila', 'Colima', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'México',
        'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca', 'Puebla', 'Querétaro', 'Quintana Roo',
        'San Luis Potosí', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán', 'Zacatecas'
    ]
};

const userEditables = [
    { label: 'Username', key: 'username', block: true },
    { label: 'Email', key: 'email', block: true },
    { label: 'Names', key: 'nombres', block: false },
    { label: 'Surname', key: 'apellidos', block: false },
    { label: 'Phone', key: 'telefono', block: false },
    { label: 'USDT Wallet(TRC20)', key: 'usdtWallet', block: false },
]

const UserPerfil = () => {
    const alertRef = useRef()

    const { userLogged, saveIc,update } = useUser()

    const [state, setState] = useState({
        verificado: false,
        imageUrl: '',
        isLoading: false,
        visiblePic: false,
        ic: false,
        idIc: '',
    })
    const [form, setForm] = useState({
        nombres: '',
        apellidos: '',
        usdtWallet: '',
        lada: '+52',
        telefono: '',
    })

    useEffect(() => {
        const ic = userLogged.wallet.interesCompuesto.find(permiso => permiso.tipo == 'com')
        if (ic) {
            changeStateLocal(setState, 'ic', ic.activo)
            changeStateLocal(setState, 'idIc', ic.interes_compuesto_id)
        }
    }, [userLogged])

    useEffect(()=>{
        console.log(userLogged);
        
       setForm(prev=>({
        ...prev,
        ['nombres']:userLogged.nombres,
        ['apellidos']:userLogged.apellidos,
        ['usdtWallet']:userLogged.wallet.wallet_address||'',
        ['lada']:userLogged.lada||"+52",
        ['telefono']:userLogged.telefono,
       })) 
    },[])

    const handleSaveIc = async () => {
        const request = {
            wallet_id: userLogged.wallet.wallet_id,
            tipo: 'com',
            activo: !state.ic,
        }

        if (state.idIc) {
            request.id = state.idIc
        }

        const result = await saveIc(request)

        if (result?.status && result?.status == 200) {
            alertRef.current.showAlert('Compound interest activated', true)
        } else {
            alertRef.current.showAlert(errorResponse(result?.status || 400), false)
        }

        changeStateLocal(setState, 'ic', !state.ic)
    }

    const handleSave = async () => {
        const request = {
            ...form,
            username: userLogged?.username,
        }

        console.log(request);

        const result=await update(request)

        if(result==200){
            alertRef.current.showAlert('Changes made successfully',true)
        }else{
            alertRef.current.showAlert('Something went wrong',false)
        }
        
        
    };


    return (
        <div>
            {/*<UploadImg visible={state.visiblePic} setVisible={setVisiblePic} userName={userData.userName} />*/}
            <MensajeAlerta ref={alertRef} />
            {state.isLoading ? (
                <div className="spinner"></div>
            ) : (
                <section className="contenido userPerfil">
                    <div className="titulos sec0-up">
                        <i className="bi bi-person-gear"></i>
                        <span>Profile</span>
                    </div>
                    <div className="sec1-up">
                        <div onClick={() => changeStateLocal(setState, 'visiblePic', true)} className="uih">
                            <i className="bi bi-pencil"></i>
                        </div>
                        <img className="userImg" src={state.imageUrl || img1} alt="user" />
                        <button onClick={() => changeStateLocal(setState, 'visiblePic', true)}>
                            <i className="bi bi-pencil-square" />
                        </button>
                        <div className="userInfo">
                            <div className="infos">
                                <p className="textoG">{userLogged?.username}</p>
                                <p className="textoM">{userLogged?.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="sec2-up">
                        <div className="dtp0 textoM3"><p>Personal data</p></div>
                        <div className="dtp1">
                            {userEditables.map(input => (
                                <div key={input.key}>
                                    {input.key === "telefono" ? (
                                        <PhoneInput
                                            inputProps={{
                                                type: "text",
                                                value: form[input.key],
                                                placeholder: userLogged[input.key],
                                                onChange: (e) => changeStateLocal(setForm, input.key, e.target.value),
                                                readOnly: input.block
                                            }}
                                            selectProps={{value: form.lada,onChange: (e) => changeStateLocal(setForm, 'lada', e.target.value)}}
                                            ti={input.label}
                                        />
                                    ) : (
                                        <Input
                                            type="text"
                                            value={form[input.key]}
                                            placeholder={userLogged[input.key]}
                                            onChange={(e) => changeStateLocal(setForm, input.key, e.target.value)}
                                            readOnly={input.block}
                                            ti={input.label}
                                        />
                                    )}
                                </div>
                            ))}
                            <button onClick={handleSave} className="boton1">
                                <span className="button_top">Save</span></button>
                        </div>
                    </div>

                    <div className="sec3-up">
                        <div className="s30-up textoM3"><p>Use compound interest</p></div>
                        <div className="s31-up textoM2">
                            <p>The "compound interest" feature automatically reinvests into the starter
                                pack every 100 USDT earned in the activated wallet. This reinvestment is carried out daily at 00:00 hours (Miami time).</p>
                        </div>
                        <div className="s33-up textoM2">
                            <p>Activate compound interest from the commission wallet</p>
                            <SwitchFun checked={state.ic} onClick={handleSaveIc} />
                        </div>
                    </div>

                    <div className="sec6-up">
                        <TwoStepVerification />
                    </div>

                </section>
            )}
        </div>
    );
};



{/* <section className="contenido userPerfil">
                   

                    <div className="sec5-up">
                        {/* <InteresCompuesto keyF={userData.firebaseKey} /> 
                    </div>

                    <div className="sec4-up">
                        {/* <div className="s40-up textoM3"><p>Address</p></div>
                        <div className="s41-up">
                            <TextInput ti={"Address"} value={direccion} setValue={setDireccion} pl={"123 Main St"} />
                            <TextInput ti={"Outdoor Number"} value={numExt} setValue={setNumExt} pl={"#202"} />
                            <TextInput ti={"Interior number"} value={numInt} setValue={setNumInt} pl={"#15 (optional)"} />
                        </div>
                        <div className="s42-up">
                            <TextInput ti={"Colony"} value={colonia} setValue={setColonia} pl={"Buenos Aires"} />
                            <TextInput ti={"City"} value={city} setValue={setCity} pl={"San Francisco"} />
                        </div>
                        <div className="s42-up">
                            <TextInput ti={"Zip/Postal code"} value={cp} setValue={setCp} pl={"96610"} />
                            <div>
                                <p htmlFor="select-estado" className="textoM2">State/Province:</p>
                                <select id="select-estado" value={estadoSeleccionado} onChange={handleChange}>
                                    <option value="">--Select--</option>
                                    <optgroup label="United States">
                                        {estados.US.map((estado, index) => (
                                            <option key={index} value={estado}>{estado}</option>
                                        ))}
                                    </optgroup>
                                    <optgroup label="México">
                                        {estados.MX.map((estado, index) => (
                                            <option key={index} value={estado}>{estado}</option>
                                        ))}
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                        <div className="s43-up">
                            <button onClick={handleSaveDireccion} className="boton1"><span className="button_top">Save</span></button>
                        </div> 
                    </div>

                    <div className="sec6-up">
                         <TwoStepVerification userData={userData} /> 
                    </div>
                </section> */}

export default UserPerfil;