<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-4" >
            <div class="container">
                <a class="navbar-brand" href="/">Tienda virtual</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="token">
                        <li class="nav-item">
                            <router-link class="nav-link" href="#" to="/CrearProducto">
                                Crear productos
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" href="#" to="/MisCompras">
                                Mis compras
                            </router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!token">
                        <li class="nav-item">
                            <router-link class="nav-link" href="#" to="/registro">
                                Registro
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" href="#" to="/login">
                                Inicar Sesion
                            </router-link>
                        </li>
                    </ul>
                    <!-- <form v-if="!token">
                        <a class="nav-link text-white " aria-current="page" href="/registro" >Registro</a>
                    </form>
                    <form v-if="!token">
                        <a class="nav-link text-white " aria-current="page" href="/login">Inicar Sesion</a>
                    </form> -->
                    <form v-if="token">
                        <a class="nav-link text-white marg" aria-current="page" href="/carrito"><i class="fa-solid fa-cart-shopping"></i></a>
                    </form>
                    <form @click="cerrarSesion()" v-if="token">
                        <a class="nav-link text-white " aria-current="page" 
                            href="/login">Cerrar Sesion</a>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data: () => ({
        token: localStorage.token,
    }),
    methods: {
        cerrarSesion() {
            localStorage.clear();
            //this.$router.go();
            this.$router.push('/login')
        },
    },
}
</script>

<style>
.marg{
    margin-right: 40px;
}
</style>