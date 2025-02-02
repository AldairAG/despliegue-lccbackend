export const validarPermiso=(permisos,key)=>{

    if (permisos.length == 0) return false
    
    const permiso = permisos.find(p => p.permisoName == key)

    if(!permiso) return false

    return permiso.activo
}