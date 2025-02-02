export const errorResponse = (errorValue, uso) => {
    if (errorValue == 204)
        return 'ususario no encontrado'
    if (errorValue == 204 && uso == 'pcf')
        return 'factura no encontrada'
    if (errorValue == 400)
        return 'Error desconocido'
    if (errorValue == 404 && uso == 'factura')
        return 'Factura no encontrada'
    if (errorValue == 404)
        return 'Usuario no encontrado'
    if (errorValue == 406 && uso == 'nip')
        return 'contrase;a incorrecta'
    if (errorValue == 201 && uso == 'facturar')
        return 'Factura creada correctamente'
    if (errorValue == 406)
        return 'contrase;a incorrecta'
}