import React from 'react'
import { NavBar } from '../ui/NavBar'

export const PaginaPrincipalScreen = () => {
  return (
    <>

      <NavBar />

      <main className='TemaOscuroClaro'>

        <section className="py-5 text-center container ">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">Calendario App</h1>
              <p className="lead text-muted">
                Prueba nuestra App. <br></br>
                Organiza los dias con tus compañeros,
                sin limite de tiempo ni compromiso
                create una cuenta ahora y comienza ahora
              </p>
              <p>
                <a href="#" className="btn btn-primary my-2">Main call to action</a>
                <a href="#" className="btn btn-secondary my-2">Secondary action</a>
              </p>
            </div>
          </div>
        </section>

        <div className="album py-5 bg-secondary">
          <div className="container">

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

            

              <div className="col">
                <div className="card shadow-sm">
                  <img className="bd-placeholder-img card-img-top" width="100%" height="250" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" src={require('../../img/IMGEventoError.PNG')} />
                  <div className="card-body">
                    <p className="card-text">Solo podrà editar los eventos propios, y no los de otras personas</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-sm">
                  <img className="bd-placeholder-img card-img-top" width="100%" height="250" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" src={require('../../img/IMGEventoUnaPersonaZonaHoraria.PNG')} />
                  <div className="card-body">
                    <p className="card-text">Con distincion horaria, que puede verlo tanto semanalmente como diariamente</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card shadow-sm">
                  <img className="bd-placeholder-img card-img-top" width="100%" height="250" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" src={require('../../img/IMGEventoAgenda.PNG')} />
                  <div className="card-body">
                    <p className="card-text">Tendrà una agenda en la que estaran los distintos eventos con sus respectivas fechas</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              

              <div className="col mt-3">
                <div className="card shadow-sm">
                  <img className="bd-placeholder-img card-img-top" width="100%" height="430" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" src={require('../../img/IMGEventoCrear.PNG')} />
                  <div className="card-body">
                    <p className="card-text">Bastarà con darle al "+" para crear un nuevo evento</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col mt-3">
                <div className="card shadow-sm">
                  <img className="bd-placeholder-img card-img-top" width="100%" height="430" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" src={require('../../img/IMGEventoEditar.PNG')} />
                  <div className="card-body">
                    <p className="card-text">Si pulsas doble click en un evento ya creado lo podrà editar</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col mt-3">
                <div className="card shadow-sm">
                  <img className="bd-placeholder-img card-img-top" width="100%" height="430" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" src={require('../../img/IMGEventoVariasPersonas.PNG')} />
                  <div className="card-body">
                    <p className="card-text">Puedes ver las anotaciones de otras personas </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      </div>
                      <small className="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </main>

      <footer className="TemaOscuroClaro text-muted py-5 ">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#">Back to top</a>
          </p>
          <p className="mb-1"></p>
        </div>
      </footer>


      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>


    </>
  )
}
