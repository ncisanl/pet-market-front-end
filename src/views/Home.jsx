import CarouselHome from "../components/CarouselHome";
import CardHome from "../components/CardHome";

import imgOneCarousel from "../assets/img/img_carousel_01.jpg";
import imgTwoCarousel from "../assets/img/img_carousel_02.jpg";
import imgThreeCarousel from "../assets/img/img_carousel_03.jpg";
import imgFourCarousel from "../assets/img/img_carousel_04.jpg";

const Home = () => {
  return (
    <section className="text-muted">
      <div className="d-flex flex-column flex-md-row align-items-center">
        <div className="col-md-6 d-flex flex-column text-center text-md-start mb-4 mb-md-0 pe-md-5">
          <h1 className="display-4 mb-4 text-dark">
            Todo para tu mascota,
            <br className="d-none d-lg-block" />
            en un solo lugar
          </h1>
          <p className="mb-4 lead">
            Descubre el marketplace que lo tiene todo para consentir a tu mejor
            amigo: alimentos, juguetes, accesorios y mucho más. ¡Encuentra
            ofertas increíbles y dale a tu mascota la calidad que se merece!
          </p>
        </div>
        <div className="col-md-6">
          {/* Carousel */}
          <CarouselHome
            imgCarouselOne={imgOneCarousel}
            imgCarouselTwo={imgTwoCarousel}
            imgCarouselThree={imgThreeCarousel}
            imgCarouselFour={imgFourCarousel}
          />
        </div>
      </div>

      <section className="text-muted pt-5">
        <div className="container">
          {/* Encabezado */}
          <div className="text-center mb-5">
            <h2 className="text-uppercase mb-1 title-card-home-personalized">
              La mejor selección para tu mascota
            </h2>
            <h1 className="fw-medium display-5 text-dark">
              PetMarket: Variedad, Calidad y Comodidad para Tus Mascotas
            </h1>
          </div>

          {/* Cards de contenido */}
          <div className="row">
            {/* Card 1 */}
            <CardHome
              icon={<i className="fa-solid fa-percent"></i>}
              title={"Ofertas Imperdibles"}
              description={
                "Aprovecha los descuentos de temporada en alimento, accesorios y más. ¡Mima a tu mascota y ahorra!"
              }
              titleButton={"Ver Ofertas"}
              linkRedirect="/"
            />

            {/* Card 2 */}
            <CardHome
              icon={<i className="fa-solid fa-suitcase-medical"></i>}
              title={"Cuidado y Salud"}
              description={
                "Desde baños y peluquería hasta asesoría veterinaria. Cuida a tu mascota con profesionales de confianza."
              }
              titleButton={"Encuentra Servicios"}
              linkRedirect="/"
            />

            {/* Card 3 */}
            <CardHome
              icon={<i className="fa-solid fa-user-group"></i>}
              title={"Comunidad PetMarket"}
              description={
                "Comparte experiencias y recibe consejos de expertos y amantes de las mascotas en nuestra comunidad en línea."
              }
              titleButton={"Únete Ahora"}
              linkRedirect="/register"
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
