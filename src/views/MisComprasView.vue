<template>
  <main>
    <Navbar />

    <div class="container p-4">
      <div class="row">
        <div class="col-md-4" v-for="compra in compras" :key="compra.id">
          <div class="card mb-2 box-shadow post-cards">
            <!-- <img v-bind:src="" class="card-img-top"> -->
            <div class="card-body">
              <h5 class="capitalize">{{ compra.name }}</h5>
              <p class="card-text">{{ compra.description }}.</p>
              <h6 class="capitalize">cantidad: {{ compra.quantity }}</h6>
              <h6 class="capitalize">COP {{ compra.total }}</h6>
              <div v-if="compra.state = true">
                <h3 class="capitalize">Comprado</h3>
              </div>
              <br>
              <form class="" @submit.prevent="Eliminar(compra.id)">
                <button type="submit" class="btn btn-danger mb-3">
                  Eliminar de mis compras
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <br>
      <!-- <nav aria-label="Page navigation example">
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
      </nav> -->
    </div>

    <h1 class="text-white text-center" v-if="compras.length === 0">
      El historial esta vacío
    </h1>

    <Footer />
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import { comprasDelete, comprasGetAndPost } from "../views/rutas.js";
export default {
  name: "MisComprasView",

  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      compras: [],
      page: 1,
      perPage: 9,
      pages: [],
      token: localStorage.token,
      id: localStorage.id,
    };
  },

  mounted() {
    if (localStorage.token != null) {
      this.Compras();
    } else {
      this.$router.push("/login");
    }
  },


  methods: {
    Borrar(id) {
      axios
        .delete(comprasDelete + id)
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
    Compras() {
      axios
        .get(comprasGetAndPost + this.id)
        .then((rows) => {
          this.compras = rows.data;
          console.log(this.compras);
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



