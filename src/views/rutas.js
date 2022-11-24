/* rutas api local*/
const baseurl = "http://127.0.0.1:5001/"


//rutas usuario
const usuariosGetAndPost = "http://127.0.0.1:5001/users/"
const usuariosDeleteAndPut = "http://127.0.0.1:5001/users/"


//rutas productos
const productosGetAndPost = "http://127.0.0.1:5001/products/"
const productosDeleteAndPut = "http://127.0.0.1:5001/products/"


//ruta de login/authenticacion
const usuario_login = "http://127.0.0.1:5001/login/"


//rutas carrito
const carritoGetAndPost = "http://127.0.0.1:5001/shoppingcart/"
const carritoGet = "http://127.0.0.1:5001/shoppingcart/?user="
const carritoDelete = "http://127.0.0.1:5001/shoppingcart/"


//rutas mis_compras
const comprasGetAndPost = "http://127.0.0.1:5001/shopping/?user="
const comprasDelete = "http://127.0.0.1:5001/shopping/"


// /* rutas api host*/
// const baseurl = "https://apitiendavirtual-production.up.railway.app"

// //rutas usuario
// const usuariosGetAndPost = "https://apitiendavirtual-production.up.railway.app/usuarios"
// const usuariosDeleteAndPut = "https://apitiendavirtual-production.up.railway.app/usuarios/"
// const usuario_login = "https://apitiendavirtual-production.up.railway.app/usuarios/login"

// //rutas productos
// const productosGetAndPost = "https://apitiendavirtual-production.up.railway.app/productos"
// const productosDeleteAndPut = "https://apitiendavirtual-production.up.railway.app/productos/"

// //rutas carrito
// const carritoGetAndPost = "https://apitiendavirtual-production.up.railway.app/carrito"
// const carritoGet = "https://apitiendavirtual-production.up.railway.app/carrito/"
// const carritoDelete = "https://apitiendavirtual-production.up.railway.app/carrito/"

// //rutas mis_compras
// const comprasGetAndPost = "https://apitiendavirtual-production.up.railway.app/compras"
// const comprasGetAndDelete = "https://apitiendavirtual-production.up.railway.app/compras/"

//rutas exportadas
export default baseurl
export {
    usuario_login, 
    usuariosGetAndPost,
    usuariosDeleteAndPut,
    productosGetAndPost,
    productosDeleteAndPut,
    carritoGetAndPost,
    carritoGet,
    carritoDelete,
    comprasGetAndPost,
    comprasDelete
}
