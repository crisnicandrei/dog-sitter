import { useRouter } from "next/router";
import React, { useState } from "react";

function Home1About() {
  const currentpage = useRouter().pathname;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      className={
        currentpage === "/about"
          ? "h1-story-area two mb-120 pt-120"
          : "h1-story-area mb-120"
      }
    >
      <div className="container">
        <div className="row g-lg-4 gy-5">
          <div className="col-lg-6">
            <div className="section-title1">
              <span>
                <img src="/assets/images/icon/section-vec-l1.svg" alt="" />
                Our Story
                <img src="/assets/images/icon/section-vec-r1.svg" alt="" />
              </span>
              <h2>Despre noi.</h2>
            </div>
            <div className="story-content">
              <p>
                {isExpanded
                  ? `Hai să-ți povestesc ceva! Tot timpul mi-a plăcut să ajut. Și acum, dar și de mic copil, am ajutat oamenii cât și animalele.
                      Chiar îmi aduc aminte, acum peste ani, că alor mei de la Tulcea nu prea le convenea că împărțeam dulciurile cu vecinii mei de la
                      bloc. Dulciuri foarte bune, pe care nu le găseai în comerț înainte de revoluție. Am fost privilegiat că tatăl meu a fost marinar și
                      aducea de peste hotare tot felul de bunătăți. Fiind plecat luni de zile de acasă în voiaj și fiindu-i greu, parcă înțeleg acum de ce
                      erau un pic supărați. Greu îmi era și mie dar îmi trecea deoarece îmi petreceam toate vacanțele la țară, unde toată ziua mă jucam cu
                      câinii bunicilor. Îi scoteam din lanț, ca să alerge liberi, îmi doream bunăstarea lor și împreună aveam tot felul de aventuri interesante
                      cu blănoșii. Salt rapid înainte în timp. Peste zeci de ani am realizat că tot asta fac. Ajut oamenii de bine și câinii. Am lucrat 20 de ani
                      în cadrul Poliției, fiind conductor canin specializat în diferite specializări și astfel puteam să fac echipă cu câinele să ajutăm oamenii
                      fiind chiar plătit pentru asta. În același timp am înființat o pensiune canină care funcționează și acum, după atâția ani, cu mare succes. 
                      Dog Camp. Tabăra cățeilor, unde se pot juca liberi și unde toți sunt pe mâini bune. În plus, am înființat împreună cu soția mea Claudia un ONG-ul 
                      de salvare câini fără stăpâni sau care se află în situații neplăcute -da, chiar și în zilele de azi unii câini stau în lanț. FURRYTALES - rescriem 
                      povestea unui blănos Da, avem de muncit, dar de fapt, nici nu simt că muncesc. În plus sunt plătit legal să am grijă de câini fie cu stăpân, fie fără. 
                      Dar, totuși, există niște limite fizice. Și deși vreau să ajut cât mai mulți oameni și cât mai mulți câini, nu se poate doar ce aș scădea calitatea 
                      serviciilor în detrimentul volumului de muncă. Aș vrea să găsesc o soluție să rezolv asta îmi spuneam și totuși n-o găseam. Până într-o zi... EVRIKA! 
                      Știu cum!!! Fac o platformă și o aplicație unde oamenii ca mine, care le plac blănoșii, pot să ajute prin faptul că găzduiesc la ei acasă câinii altor 
                      oameni care pleacă în concediu sau nu pot sta cu propriul blănos - ca o pensiune dar la nivel național Ce tare am zis! Faci bani din ceea ce îți place 
                      și nici nu simți că muncești. Haide și tu în comunitatea iubitorilor de blănoși, te invit să te înscrii, să faci parte într-o mare echipă unde toți câștigă 
                      legal. Power Together #Cățelari! ne ajutăm unii pe alții. CLICK join și haide in comunitatea iubitorilor de #Blănoși`
                  : `Hai să-ți povestesc ceva! Tot timpul mi-a plăcut să ajut. Și acum, dar și de mic copil, am ajutat oamenii cât și animalele. Chiar îmi aduc aminte, 
                      acum peste ani, că alor mei de la Tulcea nu prea le convenea că împărțeam dulciurile cu vecinii mei de la bloc. Dulciuri foarte bune, pe care nu le găseai 
                      în comerț înainte de revoluție. Am fost privilegiat că tatăl meu a fost marinar și aducea de peste hotare tot felul de bunătăți...`}
              </p>
              <button onClick={toggleExpand} className="btn btn-primary">
                {isExpanded ? "See Less" : "See More"}
              </button>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center">
            <div className="story-img">
              <img
                className="img-fluid"
                src="/assets/images/poza2.jpeg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home1About;
