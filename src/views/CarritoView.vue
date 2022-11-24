<template>
  <main>
    <Navbar />

    <div class="container p-4">
      <div class="row">
        <div class="col-md-4" v-for="carrito in carrito" :key="carrito.id">
          <div class="card mb-2 box-shadow post-cards">
            <!-- <img v-bind:src="" class="card-img-top"> -->
            <div class="card-body">
              <h5 class="capitalize">{{ carrito.name }}</h5>
              <p class="card-text">{{ carrito.description }}.</p>
              <h6 class="capitalize">COP {{ total = carrito.sale_price * carrito.quantity }}</h6>
              <span class="stepper"> Cantidad
                <button v-if="carrito.quantity > 1" @click="carrito.quantity--">–</button>
                <input type="number" id="stepper" v-model="carrito.quantity" min="1" max="10" readonly>
                <button v-if="carrito.quantity < 10" @click="carrito.quantity++">+</button>
              </span>
              <br>
              <br>
              <form class="d-flex">
                <button @click="Compras(carrito.id_product, carrito.quantity, total)" type="button"
                  class="btn btn-secondary mb-3">
                  Comprar
                </button>
                <button @click="Eliminar(carrito.id)" type="button" class="btn btn-danger mb-3 marg">
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br>
      <!-- <div class="row">
        <div class="btn-group col-md-2 offset-md-5">
          <button @click="page--" v-if="page != 1" type="button" class="btn btn-sm btn-light">
            Antes
          </button>
          <button @click="page = pageNumber" v-for="pageNumber in pages.slice(page - 1, page + 6)" :key="pageNumber"
            type="button" class="btn btn-sm btn-light">
            {{ pageNumber }}
          </button>
          <button @click="page++" v-if="page < pages.length" type="button" class="btn btn-sm btn-light">
            Siguiente
          </button>
        </div>
      </div> -->
    </div>

    <h1 class="text-white text-center" v-if="carrito.length === 0">No hay productos en el carito</h1>

    <Footer />
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { carritoGet, comprasGetAndPost, carritoDelete } from "../views/rutas.js";
export default {
  name: "CarritoView",

  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      carrito: [],
      id_product: '',
      page: 1,
      perPage: 9,
      pages: [],
      token: localStorage.token,
      id: Number(localStorage.id),
      compras: {
        user: Number(localStorage.id),
        product: "",
        quantity: "",
        total: "",
        state: true,
      }
    };
  },

  mounted() {
    if (localStorage.token != null) {
      this.Carrito();
    } else {
      this.$router.push("/login");
    }
  },


  methods: {
    Borrar(id) {
      axios
        .delete(carritoDelete + id)
        .then((response) => {
          this.status = response.data.status;
          this.$router.go();
          console.log(response);
        });
    },
    Eliminar(id) {
      this.$swal.fire({
        title: '¿Está Seguro Que Desea Eliminar?',
        text: "!No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Seguro!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.Borrar(id)
        }
      })
    },
    Compras(id, quantity, total) {
      this.compras.product = id
      this.compras.quantity = quantity
      this.compras.total = total
      console.log(this.compras);
      console.log(this.token);
      if (this.token) {
        let headers = {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        };
        axios
          .post(
            comprasGetAndPost,
            this.compras,
            {
              validateStatus: function (status) {
                return status < 500; // Resuelve solo si el código de estado es menor que 500
              },
            },
            headers
          )
          .then((response) => {
            this.$router.push('/MisCompras')
            this.$swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Producto Comprado',
              showConfirmButton: false,
              timer: 1500
            })
            console.log(response);
          });
      }
    },
    Carrito() {
      axios
        .get(carritoGet + this.id)
        .then((rows) => {
          this.carrito = rows.data;
          // this.id_product
          console.log(this.carrito);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    paginate(productos) {
      let page = this.page
      let perPage = this.perPage
      let from = (page * perPage) - perPage;
      let to = (page * perPage)
      return productos.slice(from, to)
    },
    setArticles() {
      let numberofpages = Math.ceil(this.productos.length / this.perPage)
      for (let i = 1; i <= numberofpages; i++) {
        this.pages.push(i)
      }
    }
  },
  computed: {
    displayedArticles() {
      return this.paginate(this.productos)
    }
  },
  watch: {
    productos() {
      this.setArticles()
    }
  },

}
</script>

<style scoped>
.marg {
  margin-left: 30%;
}

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

.stepper {
  border: 1px solid #eee;
  display: inline-block;
  overflow: visible;
  height: 2.1em;
  background: #fff;
  padding: 1px;
}

.stepper input {
  width: 3em;
  height: 100%;
  text-align: center;
  border: 0;
  background: transparent;
  color: #000;
}

.stepper button {
  width: 1.4em;
  font-weight: 300;
  height: 100%;
  line-height: 0.1em;
  font-size: 1.4em;
  padding: 0.2em !important;
  background: #eee;
  color: #333;
  border: none;
}
</style>



