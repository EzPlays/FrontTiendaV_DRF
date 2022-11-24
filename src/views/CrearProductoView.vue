<template>
  <div>

    <Navbar />

    <div class="container card login w-50">
      <div class="card-header text-center">Crear producto</div>
      <div class="card-body">
        <form class="" @submit.prevent="CrearProducto()">
          <div class="mb-4 col-auto">
            <label for="name" class="form-label">Nombre</label>
            <input v-model="producto.name" required type="text" class="form-control" id="name"
              autocomplete="off">
          </div>
          <div class="mb-4 col-auto">
            <label for="description" class="form-label">Descripcion</label>
            <textarea required v-model="producto.description" class="form-control" name="description" id="description" rows="3" ></textarea>
            <!-- <input v-model="producto.descripcion" required type="" class="form-control" id="Descripcion"
              autocomplete="off"> -->
          </div>
          <div class="mb-4 col-auto">
            <label for="cost" class="form-label">Costo</label>
            <input v-model="producto.cost" required type="number" class="form-control" id="cost"
              autocomplete="off">
          </div>
          <div class="mb-4 col-auto">
            <label for="sale_price" class="form-label">Precio de venta</label>
            <input v-model="producto.sale_price" required type="number" class="form-control" id="sale_price"
              autocomplete="off">
          </div>
          <div class="d-grid gap-2 mx-auto col-4">
            <button type="submit" class="btn btn-secondary mb-3">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>

    <Footer />

  </div>
</template>
  
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { productosGetAndPost } from "../views/rutas.js";
export default {
  name: "CrearProductoView",

  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      producto: {
        name: "",
        description: "",
        cost: "",
        sale_price: "",
      },
    };
  },

  mounted() {
    if (localStorage.token != null) {
      
    } else {
      this.$router.push("/login");
    }
  },

  methods: {
    CrearProducto() {
      axios
        .post(
          productosGetAndPost,
          this.producto,
          {
            validateStatus: function (status) {
              return status < 500; // Resuelve solo si el código de estado es menor que 500
            },
          },
        )
        .then((response) => {
          this.$router.push('/')
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto creado',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(response);
        });
    },
  },
}
</script>
  
<style>
.login {
  margin-top: 90px;
  margin-bottom: 90px;
}

</style>