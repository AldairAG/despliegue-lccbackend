import { useSelector, useDispatch } from "react-redux";
import { ROUTES, ROUTES_USER } from '../constants/routes'
import {
    fetchAllUsers, fetchUserForAdmin, updateUser, getCardUserData, fetchUser,
    register, fetchMyNet, ServiceSaveIc,tryNip,updateService,sendEmailService,
    updateNipService
} from "../service/userService";
import { modificarPermiso } from "../service/permisoService";
import {
    loadingUsers, loadingSelectUser, handleChange, loadingLoggedUser,resetState
} from "../store/slices/userSlice";
import { useHistory } from 'react-router-dom';
import { getDifferences } from '../utils/helpers'

export const useUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { usersList, userSelect, userLogged, userSelectOrignial,
        cardUser, loginRequest, registerRequest, loading, changeLoadingSlice } = useSelector((state) => state.user)


    const getAllUsers = async () => {
        try {
            const result = await fetchAllUsers()
            if(result?.data){
                dispatch(loadingUsers(result?.data));
                return
            }
            dispatch(loadingUsers([]));
        } catch (error) {
            console.log(error)
        }
    }
    const getMyNet = async (username) => {
        const result = await fetchMyNet(username);
        //Validar si la respuesta es esta vacio /nula en caso de ser asi devolver un arreglo vacio
        return result?.data?.length ? result.data : [];
    };
    const getSelectUser = async (id) => {
        try {
            const result = await fetchUserForAdmin(id)
            dispatch(loadingSelectUser(result?.data));
            console.log(result?.data);

        } catch (error) {
            console.log(error)
        }
    }
    const updateByAdmin = async (id) => {
        //const body = getDifferences(userSelectOrignial, userSelect)
        //console.log(body)
        const body=userSelect
        await updateUser(id, body)
    }
    const handleChangeState = (name, value, nodo) => {
        dispatch(handleChange({ name, value, nodo }))
    }
    const navigateTo = (to) => {
        history.push(to);
    }
    const changeLoading = (value) => {
        dispatch(changeLoadingSlice(value))

    }
    const tryLogin = async () => {
        const result = await fetchUser(loginRequest)
        //POSIBLE REMPLAZO POR DTO//
        if (result?.status != 200) return result

        localStorage.setItem("user", result?.data.username);
        localStorage.setItem("pass", result?.data.password);
        dispatch(loadingLoggedUser(result?.data));
        return result
    }
    const registerUser = async () => {
        try {
            const result = await register(registerRequest)

            if(result?.status && result?.status==201 ){
                handleChangeState('credencial', registerRequest.username, 'login') 
                handleChangeState('password', registerRequest.password, 'login') 
                await tryLogin()
                navigateTo(ROUTES_USER.HOME)
            }

        } catch (error) {
            alert('Error')
            console.log(error)
        }
    }
    const updatePermiso = async (body) => {
        const result = await modificarPermiso(body)
        if (result?.status && result?.status == 200) {
            return result
        }

        return true
    }
    const saveIc = async (body) => {
        const result = await ServiceSaveIc(body)
        if (result?.status && result?.status == 200) {
            await tryLogin()
            return result
        }
    }
    const logOut=()=>{
        dispatch(resetState())
        navigateTo(ROUTES.LOGIN)
    }
    const validateNip=async(nip)=>{
        const result=await tryNip(userLogged?.username,nip)
        if(result?.status && result?.status==200){
            return true
        }else{return false}
    }
    const update=async(request)=>{
        const result=await updateService(request)
        if(result?.status && result?.status==200){
            return 200
        }else{return 400}
    }
    const sendEmail=async(template,request)=>{
        const result=await sendEmailService(template,request)
        if(result?.status && result?.status==200){
            return 200
        }else{return 400}
    }
    const updateNip=async(newNip)=>{
        const result=await updateNipService(userLogged.wallet.wallet_id,userLogged.id,newNip)
        if(result?.status && result?.status==200){
            return 200
        }else{return 400}
    }


    return {
        usersList,
        userSelect,
        userLogged,
        cardUser,
        loginRequest,
        registerRequest,
        loading,
        getCardUserData,
        changeLoading,
        getAllUsers,
        getSelectUser,
        handleChangeState,
        updateByAdmin,
        tryLogin,
        navigateTo,
        registerUser,
        getMyNet,
        updatePermiso,
        saveIc,
        logOut,
        validateNip,
        update,
        sendEmail,
        updateNip,
    };
}