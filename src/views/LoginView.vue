<template>
  <div>
    <Navbar />
    <div class="container card login w-50">
      <div class="card-header text-center">Iniciar sesion</div>
      <div class="card-body">
        <form class="" @submit.prevent="Login()">
          <div class="mb-4 col-auto">
            <label for="email" class="form-label">Correo</label>
            <input :class="{ error: validaEmail() }" v-model="formP.email" required type="email" class="form-control"
              id="email" autocomplete="off" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">Correo valido ejemplo: example@gmail.co, example@gmail.com</div>
          </div>
          <div class="mb-4 col-auto">
            <label for="password" class="form-label">Contraseña</label>
            <div class="d-flex">
              <input :class="{ error: validaPassword() }" v-model="formP.password" required type="password"
                class="form-control flex-fill" id="password" autocomplete="off">
              <div class="input-group-append">
                <button id="show_password" class="btn btn-secondary flex-fill" type="button" title="mostrar contraseña"
                  @click="mostrarContrasena()"> <i class="fa-solid fa-eye-slash icon"></i> </button>
              </div>
            </div>
            <div class="form-text">Contraseña segura 1 mayuscula, 1 minuscula, 1 numero</div>
          </div>
          <a id="passwordHelpBlock" class="text-center form-text nav-link" href="/registro">
            ¿No tienes cuenta? ¡registrate ya!
          </a>
          <br>
          <div class="d-grid gap-2 mx-auto col-4">
            <button type="submit" class="btn btn-secondary mb-3">
              Ingresar
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
import { usuario_login } from "../views/rutas.js";
export default {
  name: "LoginView",

  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      token: "",
      formP: {
        email: "",
        password: "",
      },
    };
  },


  mounted() {
    if (localStorage.token != null) {
      this.$router.push("/");
    } else {
      
    }
  },

  methods: {
    mostrarContrasena() {
      var cambio = document.getElementById("password");
      if (cambio.type == "password") {
        cambio.type = "text";
      } else {
        cambio.type = "password";
      }
    },
    validaEmail() {
      var exp =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (exp.test(this.formP.email)) {
        return false;
      } else {
        return true;
      }
    },
    validaPassword() {
      var exp = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
      if (exp.test(this.formP.password)) {
        return false;
      } else {
        return true;
      }
    },
    Login() {
      if (this.validaEmail() === false && this.validaPassword() === false) {
        let headers = {
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        };
        axios
          .post(
            usuario_login,
            this.formP,
            {
              validateStatus: function (status) {
                return status < 500; // Resuelve solo si el código de estado es menor que 500
              },
            },
            headers
          )
          .then((response) => {
            if (response.data.error !== "Contraseña o email incorrectos") {
              console.log(response);
              console.log(response.data.token);
              console.log(response.data.user.id);
              localStorage.id = response.data.user.id;
              
              let access_token = response.data.token;
              localStorage.token = access_token;
              this.$router.push("/");
              this.$swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Inicio Exitoso ¡Bienvenido!',
                showConfirmButton: false,
                timer: 1500
              })
              console.log(localStorage.token);

            } else {
              this.$swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Contraseña o email incorrectos',
              })
            }
          });
      } else {
        console.log(response);
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'tu correo o contraseña no son validos',
        })
      }
    },
  },
}
</script>
  
<style>
.login {
  margin-top: 90px;
  margin-bottom: 90px;
}

input.error {
  border-bottom: 3px solid red;
}
</style>