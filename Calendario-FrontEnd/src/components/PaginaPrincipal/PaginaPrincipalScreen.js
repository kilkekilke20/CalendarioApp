import React from 'react';
import { NavBar } from '../ui/NavBar';
import { Link } from 'react-router-dom';
import '../../css/ModoOscuroClaro.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
export const PaginaPrincipalScreen = () => {

  return (
    <>

      <NavBar />

      <main className='TemaOscuroClaro'>

        <section id="hero">
          <div class="hero-container" data-aos="zoom-in" data-aos-delay="100">
            <h1>Bienvenido a CalendarioApp</h1>
            <h2>Organizate con tus compañeros</h2>
            <a href="#about" class="btn-get-started">Get Started</a>
          </div>
        </section>

        {/* ======= About Section ======= */}
        <section className='TemaOscuroClaro' id="about">
          <div class="container" data-aos="fade-up">
            <div class="row about-container">

              <div class="col-6 content order-1">
                <h2 class="title">Acerca de la aplicación</h2>
                <p>
                  Es una agenda desarrollada para permitir la organización de varias personas, permitiendo compartir eventos
                  y de una forma completamente gratuira
                </p>

                <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
                  <div class="icon"><i class="bi bi-briefcase"></i></div>
                  <h4 class="title"><a>Ambiente de trabajo</a></h4>
                  <p class="description">Puedes organizar tus reuniones y tus proyectos de trabajo facilmente</p>
                </div>

                <div class="icon-box" data-aos="fade-up" data-aos-delay="200">
                  <div class="icon"><i class="bi bi-people-fill"></i></div>
                  <h4 class="title"><a >Sin limites</a></h4>
                  <p class="description">No hay limite de personas, invita a tus amigos o compañeros y unete</p>
                </div>

                <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
                  <div class="icon"><i class="bi bi-google"></i></div>
                  <h4 class="title"><a >Inicio con Google</a></h4>
                  <p class="description">Tambien contamos con un inicio de sesion con Google por lo que no tengas miedo de
                    empezar ahora</p>
                </div>

              </div>

              <div class="col-6 background order-2" data-aos="fade-left" data-aos-delay="100">
                <img className="bd-placeholder-img card-img-top" 
                width="100%" 
                height="370" 
                role="img" 
                aria-label="Placeholder: Thumbnail" 
                preserveAspectRatio="xMidYMid slice" 
                focusable="false" 
                src={require('../../img/IMGEventoVariasPersonas.PNG')} />
              </div>
            </div>

          </div>
        </section>
        {/* ======= End About Section ======= */}

        <section id="separacion"></section>

        {/* ======= Services Section ======= */}
        <section id="services">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h3 class="section-title">Funcionalidades</h3>
              <p class="section-description">Nuestra App posee gran variedad de funcionalidades</p>
            </div>
            <div class="row">
              <div class="col-4" data-aos="zoom-in">
                <div class="box">
                  <div class="icon"><a ><i class="bi bi-briefcase"></i></a></div>
                  <h4 class="title"><a >Todos pueden ver tus eventos</a></h4>
                  <p class="description">Cualquiera podrá ver tus eventos, y las anotaciones de este, lo cual lo hace muy
                    util para ambientes organizativos profesionales</p>
                </div>
              </div>
              <div class="col-4" data-aos="zoom-in">
                <div class="box">
                  <div class="icon"><a ><i class="bi bi-card-checklist"></i></a></div>
                  <h4 class="title"><a >Perfil Personalisable</a></h4>
                  <p class="description">Podrás cambiarte el email, contraseña y tu nombre en cualquier momento</p>
                </div>
              </div>
              <div class="col-4" data-aos="zoom-in">
                <div class="box">
                  <div class="icon"><a ><i class="bi bi-journal-check"></i></a></div>
                  <h4 class="title"><a >Cada evento es propio</a></h4>
                  <p class="description">cada evento pertenece a la persona que lo crea, por lo cual nadie podra editar o
                    borrar un evento que no ha sido creado por el</p>
                </div>
              </div>

              <div class="col-4" data-aos="zoom-in">
                <div class="box">
                  <div class="icon"><a ><i class="bi bi-shield-lock-fill"></i></a></div>
                  <h4 class="title"><a >Login seguro</a></h4>
                  <p class="description">Las cuentas de los usuarios estan encriptada en todo momento</p>
                </div>
              </div>
              <div class="col-4" data-aos="zoom-in">
                <div class="box">
                  <div class="icon"><a ><i class="bi bi-brightness-high"></i></a></div>
                  <h4 class="title"><a >Modo Oscuro</a></h4>
                  <p class="description">Poseemos modo oscuro y claro, según su preferencia</p>
                </div>
              </div>
              <div class="col-4" data-aos="zoom-in">
                <div class="box">
                  <div class="icon"><a ><i class="bi bi-calendar4-week"></i></a></div>
                  <h4 class="title"><a >Calendario</a></h4>
                  <p class="description">Nuestro Calendario es intuitivo y facil de usar</p>
                </div>
              </div>
            </div>

          </div>
        </section>
        {/* ======= End Services Section ======= */}

        {/* ======= Call To Action Section ======= */}
        <section id="call-to-action">
          <div class="container">
            <div class="row" data-aos="zoom-in">
              <div class="col-9 text-center text-start">
                <h3 class="cta-title">Inicia sesion o registrate</h3>
                <p class="cta-text">
                  Inicia sesion o registrate para empezar a usar nuestra App
                </p>
              </div>
              <div class="col-3 cta-btn-container text-center">
                <Link
                  className='cta-btn align-middle'
                  to="/PaginaPrincipal/login"
                >
                  Login
                </Link>
              </div>
            </div>

          </div>
        </section>
        {/* ======= End Action Section ======= */}

        {/* ======= Portafolio ======= */}
        <section id="portfolio" class="portfolio">
          <div class="container" data-aos="fade-up">
            <div class="section-header">
              <h3 class="section-title">Funcionalidades</h3>
              <p class="section-description">
                Esto es lo principal que ofrecemos
              </p>
            </div>

            <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">

              <div class="col-4 portfolio-item">
                <img src={require('../../img/IMGEventoError.PNG')} class="img-fluid" alt="Responsive" />
                <div class="portfolio-info">
                  <h4>Seguridad</h4>
                  <p>Solo podrà editar los eventos propios, y no los de otras personas</p>
                </div>
              </div>

              <div class="col-4 portfolio-item">
                <img src={require('../../img/IMGEventoUnaPersonaZonaHoraria.PNG')} class="img-fluid" alt="Responsive " />
                <div class="portfolio-info">
                  <h4>Distinción</h4>
                  <p>Con distincion horaria, que puede verlo tanto semanalmente como diariamente</p>
                </div>
              </div>

              <div class="col-4 portfolio-item">
                <img src={require('../../img/IMGEventoAgenda.PNG')} class="img-fluid" alt="Responsive " />
                <div class="portfolio-info">
                  <h4>Organizacion</h4>
                  <p>Tendrà una agenda en la que estaran los distintos eventos con sus respectivas fechas</p>
                </div>
              </div>
              {/* ======= ======= */}
              <div class="col-4 portfolio-item">
                <img src={require('../../img/IMGEventoCrear.PNG')} class="img-fluid" alt="Responsive " />
                <div class="portfolio-info">
                  <h4>Creación</h4>
                  <p>Bastarà con darle al "+" para crear un nuevo evento</p>
                </div>
              </div>

              <div class="col-4 portfolio-item">
                <img src={require('../../img/IMGEventoEditar.PNG')} class="img-fluid" alt="Responsive " />
                <div class="portfolio-info">
                  <h4>Editable</h4>
                  <p>Si pulsas doble click en un evento ya creado lo podrà editar</p>
                </div>
              </div>

              <div class="col-4 portfolio-item">
                <img src={require('../../img/IMGPerfil.PNG')} class="img-fluid" alt="Responsive " />
                <div class="portfolio-info">
                  <h4>Personalizacion</h4>
                  <p>Puedes editar tu perfil en todo momento</p>
                </div>
              </div>

            </div>

          </div>
        </section>
        {/* ======= End Portafolio ======= */}

      </main>

      <footer id="footer">
        <a href="#" class="d-flex align-items-center justify-content-center">
          <i class="bi bi-arrow-up-short">
          </i>
        </a>
      </footer>





    </>
  )
}
