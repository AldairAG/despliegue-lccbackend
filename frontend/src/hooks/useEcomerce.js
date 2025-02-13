import { useDispatch, useSelector } from "react-redux";
import { updateCart,vaciar } from '../store/slices/ecomerceSlice'
import { editOrdenService, fetchOrdenes, saveOrdenService } from '../service/ecomerceService'

export const useEcomerce = () => {
    const dispatch = useDispatch();
    const { carrito } = useSelector((state) => state.ecomerce)
    const { userLogged } = useSelector((state) => state.user)

    const calcularTotales = (productos) => {
        const sumCantidad = productos.reduce((acc, item) => acc + item.cantidad, 0);
        const sumPrecio = productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
        return {
            total: sumPrecio,
            envio: sumCantidad > 4 ? 0 : 8.0
        };
    };

    const updateCarrito = (productos) => {
        const { total, envio } = calcularTotales(productos);

        return {
            envio,
            products: productos,
            username: userLogged.username,
            total
        };
    };

    const addToCart = (producto) => {
        const products = [...carrito.products];
        const existeProducto = products.find(item => item.name === producto.name);

        let nuevosProductos = existeProducto
            ? products.map(item =>
                item.name === producto.name
                    ? { ...item, cantidad: item.cantidad + producto.cantidad }
                    : item
            )
            : [...products, producto];

        dispatch(updateCart(updateCarrito(nuevosProductos)));
    };

    const deleteProduct = (name) => {
        const nuevosProductos = carrito.products.filter(item => item.name !== name);
        dispatch(updateCart(updateCarrito(nuevosProductos)));
    };

    const handleRequest = async (serviceFunction, ...params) => {
        try {
            const result = await serviceFunction(...params);
            const { status, data } = result || {};
    
            if (status === 201 || status === 200) {
                return data || status;
            }
            return status || 400;
        } catch (error) {
            console.error("Error en la petición:", error);
            return 500;
        }
    };
    
    const createOrden = async (request) => {
        const result = await handleRequest(saveOrdenService, request);
        if (result === 201) vaciarCart();
        return result;
    };
    
    const editOrden = async (id, request) => handleRequest(editOrdenService, id, request);
    
    const getOrdenes = async (username) => handleRequest(fetchOrdenes, username);
    
    const vaciarCart = () => {
        dispatch(vaciar())
    };

    return {
        addToCart, deleteProduct, vaciarCart,
        carrito
    }

}