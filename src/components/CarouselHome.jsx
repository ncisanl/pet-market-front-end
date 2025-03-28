const CarouselHome = ({
  imgCarouselOne,
  imgCarouselTwo,
  imgCarouselThree,
  imgCarouselFour,
}) => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {/* Slide 1 */}
        <div className="carousel-item active position-relative">
          <img
            src={imgCarouselOne}
            className="d-block w-100"
            alt="First slide"
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
            <div className="p-3 carousel-box-personalized">
              <h5 className="text-white mb-0">Alimentos</h5>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="carousel-item position-relative">
          <img
            src={imgCarouselTwo}
            className="d-block w-100"
            alt="Second slide"
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
            <div className="p-3 carousel-box-personalized">
              <h5 className="text-white mb-0">Snacks</h5>
            </div>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="carousel-item position-relative">
          <img
            src={imgCarouselThree}
            className="d-block w-100"
            alt="Third slide"
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
            <div className="p-3 carousel-box-personalized">
              <h5 className="text-white mb-0">Medicamentos</h5>
            </div>
          </div>
        </div>

        {/* Slide 4 */}
        <div className="carousel-item position-relative">
          <img
            src={imgCarouselFour}
            className="d-block w-100"
            alt="Third slide"
          />
          <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
            <div className="p-3 carousel-box-personalized">
              <h5 className="text-white mb-0">Accesorios</h5>
            </div>
          </div>
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselHome;
