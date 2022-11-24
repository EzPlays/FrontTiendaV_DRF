<template>
  <main>
    <Navbar />

    <div class="container p-4">
      <div class="row">
        <div class="col-md-4" v-for="produc in displayedPosts" :key="produc.id">
          <div class="card mb-2 box-shadow post-cards">
            <!-- <img v-bind:src="" class="card-img-top"> -->
            <div class="card-body">
              <h5 class="capitalize">{{ produc.name }}</h5>
              <p class="card-text">{{ produc.description }}</p>
              <h6 class="capitalize">COP {{ produc.sale_price }}</h6>
              <br>
              <form class="" @submit.prevent="Carrito(produc.id)">
                <button type="submit" class="btn btn-secondary mb-3">
                  Agregar al carrito
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br>
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
          </li>
          <li class="page-item">
            <button type="button" class="page-link" v-for="pageNumber in pages.slice(page - 1, page + 5)"
              @click="page = pageNumber" :key="pageNumber"> {{ pageNumber }} </button>
          </li>
          <li class="page-item">
            <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
          </li>
        </ul>
      </nav>
      <!-- <div class="row">
        <div class="btn-group col-md-2 offset-md-5">
          <button @click="page--" v-if="page != 1" type="button" class="btn btn-sm btn-outline-secondary">
            Antes
          </button>
          <button @click="page = pageNumber" v-for="pageNumber in pages.slice(page - 1, page + 6)" :key="pageNumber"
            type="button" class="btn  btn-sm btn-outline-secondary">
            {{ pageNumber }}
          </button>
          <button @click="page++" v-if="page < pages.length" type="button" class="btn  btn-sm btn-outline-secondary">
            Siguiente
          </button>
        </div>
      </div> -->
    </div>

    <Footer />
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { productosGetAndPost, carritoGetAndPost } from "../views/rutas.js";
export default {
  name: "HomeView",

  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      productos: [],
      page: 1,
      perPage: 9,
      pages: [],
      token: localStorage.token,
      carrito: {
        user: Number(localStorage.id),
        product: '',
        quantity: 1
      }
    };
  },

  mounted() {
    this.Productos();
  },


  methods: {
    Carrito(id) {
      this.carrito.product = id
      console.log(this.carrito);
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
            carritoGetAndPost,
            this.carrito,
            {
              validateStatus: function (status) {
                return status < 500; // Resuelve solo si el código de estado es menor que 500
              },
            },
            headers
          )
          .then((response) => {
            this.$router.push('/carrito')
            this.$swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Producto agregado al carrito',
              showConfirmButton: false,
              timer: 1500
            })
            console.log(response);
          });
      } else {
        this.$router.push('/login')
        this.$swal.fire({
          icon: 'info',
          title: 'Espera...',
          text: 'Debes iniciar sesion para agregar un producto al carrito',
        })
      }
    },
    Productos() {
      axios
        .get(productosGetAndPost)
        .then((rows) => {
          this.productos = rows.data;
          console.log(this.productos);
          console.log(this.productos.length);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    setPages() {
      let numberOfPages = Math.ceil(this.productos.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(productos) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return productos.slice(from, to);
    }
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.productos);
    }
  },
  watch: {
    productos() {
      this.setPages();
    }
  },
  // created() {
  //   this.Productos();
  // },
  // filters: {
  //   trimWords(value) {
  //     return value.split(" ").splice(0, 20).join(" ") + '...';
  //   }
  // }

}
</script>

<style scoped>
button.page-link {
  display: inline-block;
}

button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}

.offset {
  width: 500px !important;
  margin: 20px auto;
}
</style>
