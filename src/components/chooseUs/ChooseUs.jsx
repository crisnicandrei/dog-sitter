import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

function ChooseUs() {
  const [seeMore, setSeeMore] = useState(false);

  const handleSeeMore = () => setSeeMore(!seeMore);
  return (
    <div className="h1-choose-area mb-120">
      <div className="container ">
        <div className="row g-lg-4 gy-5 justify-content-center">
          <div className="col-lg-6">
            <div className="section-title1">
              <h2>Asiguram cele mai bune servicii.</h2>
            </div>
            <div className="choose-content">
              <p>
                Membrii acestei platforme sunt iubitori de animale din oficiu,
                vă garantez. Altfel, nu s-ar fi implicat în această comunitate
                mare la nivel național. Totuși, pentru a fi siguri că sunt
                responsabili, pe lângă faptul că iubesc animalele, aceștia
                trebuie să treacă printr-un proces riguros de verificare din
                trei surse diferite. Avem o politică bine pusă la punct pentru
                selecție, așa că nu oricine poate fi primit să servească nevoile
                celorlalți.
              </p>

              {seeMore && (
                <>
                  <p>
                    În plus, este esențial să aibă o relație deschisă cu
                    părinții blănoșilor, să trimită poze și update-uri cu ce se
                    întâmplă, dacă acest lucru este cerut. Transparența și
                    disponibilitatea sunt fundamentale pentru valorile
                    serviciilor noastre. Cu toții avem telefoane smart, așa că
                    este foarte la îndemână să ții legătura în ziua de azi.
                  </p>

                  <p>
                    Nu trebuie să-ți faci griji nici pentru datele tale
                    personale, deoarece unul dintre membrii fondatori ai
                    platformei este expert în GDPR. Datele tale sunt în
                    siguranță cu noi. Platforma noastră respectă toate normele
                    de confidențialitate. Avem alături de noi și cei mai buni
                    avocați și juriști din domeniu, care sunt, de asemenea,
                    iubitori de animale și își doresc să ajute ca tu să poți
                    oferi ajutor în mod legal, fără să îți faci griji că faci
                    bani ilegal.
                  </p>

                  <p>
                    Și, nu în ultimul rând, ai suport 24/7 din partea echipei
                    noastre, indiferent de problemele pe care le-ai putea
                    întâmpina. Suntem o mare familie iubitoare de animale de
                    companie și este momentul să ne strângem rândurile în jurul
                    unui concept creat pentru a ajuta.{" "}
                    <strong>
                      <em>Power Together Cățelare!</em>
                    </strong>
                  </p>
                </>
              )}
            </div>
            <button className="btn btn-primary" onClick={handleSeeMore}>
              {seeMore ? "See Less" : "See More"}
            </button>
          </div>
          <div className="col-lg-6 col-md-8">
            <div className="choose-img">
              <div className="choose-vector">
                <img src="/assets/images/icon/choose-vector.svg" alt="" />
              </div>
              <img
                className="img-fluid"
                src="/assets/images/pupi.jpeg"
                alt="choose-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
