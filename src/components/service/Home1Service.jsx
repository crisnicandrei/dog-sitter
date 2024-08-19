import Link from "next/link";
import React from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);
function Home1Service() {
  const serviceSlider = {
    slidesPerView: "auto",
    spaceBetween: 24,
    // centeredSlides: true,
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 2000,
    },
    navigation: {
      nextEl: ".next-btn-1",
      prevEl: ".prev-btn-1",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 4,
      },
      1600: {
        slidesPerView: 4,
      },
    },
  };
  return (
    <div className="h1-service-area pt-120 mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center"></div>
        </div>
        <div className="row d-sm-flex d-none">
          <div className="col-lg-12"></div>
        </div>
        <div className="row">
          <div className="services-card1 three">
            <img
              className="services-card-vec"
              src="/assets/images/bg/services-card-vec.png"
              alt=""
            />
            <div className="icon">
              <img src="/assets/images/icon/boarding2.svg" alt="" />
            </div>
            <div className="content">
              <h3>
                <Link legacyBehavior href="/service-details">
                  <a>Dog Boarding</a>
                </Link>
              </h3>
              <p>
                Blănosul altuia stă peste noapte la tine acasă și e tratat ca un
                oapete de seamă, ca un membru al familiei
              </p>
            </div>
          </div>
          <div className="services-card1 two">
            <img
              className="services-card-vec"
              src="/assets/images/bg/services-card-vec.png"
              alt=""
            />
            <div className="icon">
              <img src="/assets/images/icon/daycare-center2.svg" alt="" />
            </div>
            <div className="content">
              <h3>
                <Link legacyBehavior href="/service-details">
                  <a>Pet Sitter</a>
                </Link>
              </h3>
              <p>
                Te duci acasă la blănos conform înțelegerii prealabile și
                programului stabilit ca să îl ajuți să nu se simtă singur și îl
                ajuți cu rutina zilnică când ai lui sunt plecați de acasă.
              </p>
            </div>
          </div>
          <div className="services-card1">
            <img
              className="services-card-vec"
              src="/assets/images/bg/services-card-vec.png"
              alt=""
            />
            <div className="icon">
              <img src="/assets/images/icon/care.svg" alt="" />
            </div>
            <div className="content">
              <h3>
                <Link legacyBehavior href="/service-details">
                  <a>Doggy Daycare</a>
                </Link>
              </h3>
              <p>
                Fii doamna /domnul educator de la grădiniță. Ajută-l pe blănos
                să nu rămână singur în casa când părinții lui sunt plecați la
                job. Ei ți-l aduc dimineața la grădi, la tine acasă și seara vin
                să îl ia de la tine el fiind liniștit și bucuros ca ai fost
                alături de el toată ziua.
              </p>
            </div>
          </div>
          <div className="services-card1 two">
            <img
              className="services-card-vec"
              src="/assets/images/bg/services-card-vec.png"
              alt=""
            />
            <div className="icon">
              <img src="/assets/images/icon/walked.svg" alt="" />
            </div>
            <div className="content">
              <h3>
                <Link legacyBehavior href="/service-details">
                  <a> Dog Walker</a>
                </Link>
              </h3>
              <p>
                Te duci la blănos acasă și faci o plimbare prin cartierul lui
                ajutând-l să își facă cota de mișcare fizică atunci când
                părinții lui nu au timp sau sunt comozi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home1Service;
