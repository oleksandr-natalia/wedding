"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Btn from "./button";
import BtnD from "./buttonD";

export default function Home() {
  //  /* ---------------- SCROLL REVEAL HOOK ---------------- */
  function useScrollReveal(threshold = 0.2) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      }, { threshold });

      observer.observe(el);

      return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
  }
  const hero = useScrollReveal();
  const wishes = useScrollReveal();
  const formTitle = useScrollReveal();
  const calendar = useScrollReveal();
  const title = useScrollReveal();


  let array = ["ПН", "ВТ", "CP", "ЧТ", "ПТ", "СБ", "НД"];
  let days = Array.from({ length: 31 }, (_, i) => i + 1);


  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
  });


  useEffect(() => {
    const weddingDate = new Date("2026-07-18T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          finished: true,
        });
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        finished: false,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);



  const [name, setName] = useState("");
  const [guest, setGuest] = useState("");
  const [attending, setAttending] = useState<"Я прийду" | "А ніхуя" | "Прийду з табуном" | null>(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitForm = async () => {
    setError("");

    if (!name.trim()) {
      setError("Введіть ім’я");
      return;
    }

    if (!attending) {
      setError("Оберіть: буду / не буду");
      return;
    }

    const fd = new FormData();
    fd.append("name", name);
    fd.append("attending", attending);
    fd.append("guest", guest);

    await fetch("https://script.google.com/macros/s/AKfycbzCQJTLT_aPzldmhe3jcRBxZ0ScjyXg_u7t1BX3t_y-WFpQhN1BWfpkyXEtmLP5orvP/exec", { method: "POST", body: fd });

    setLoading(true);

    setName("");
    setAttending(null);
    setGuest("");

  };

  return (
    <div className="min-h-screen flex  justify-center">
      <div className="b w-[500px] text-center bg-[#fffdeb]">

        <div style={{ backgroundImage: "url('/wedding/i1.jpg')" }} className="h-[600px]  bg-cover bg-center flex items-center justify-center">
          <h1 className="mt-[-380px] text-olive-300 font-['Great_Vibes',cursive] text-[80px] min-[489px]:text-[100px] text-center leading-none">
            <span>Олександр</span> <span>та</span> <span>Наталія</span>
          </h1>
        </div>

        <div className="position: relative flex flex-col gap-y-[30px]"> {/* контейнер  */}
          <div className="position: absolute z-[999] top-[-30px]">
            <img src="/wedding/i4.png" alt="" />
          </div>


          <div ref={hero.ref} className={`ml-[20px] mr-[20px] transition-all duration-700 ease-out
          ${hero.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className={`pt-[40px] font-['Great_Vibes',cursive] text-[50px]  `} >
              Любі Гості!
            </h2>
            <p>
              Один день у цьому році буде для нас дуже особливим і ми хотіли би його провести у колі близьких для нас людей.</p>
            <p className={` mt-[10px]`} > З великим задоволенням запрошуємо вас відсвяткувати цей день разом!</p>
          </div>

          {/* ------------------------------------------------------------------------------------ */}

          <div ref={calendar.ref} className={`max-w-[350px] mx-auto  transition-all duration-700 ease-out
          ${calendar.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-x-20"}`} >
            <h2 className={`font-['Great_Vibes',cursive] text-[50px] `}>
              Липень
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {array.map((day, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center rounded"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className={`grid grid-cols-7 gap-2 `} >
              <div className="w-10 h-10 flex items-center justify-center"></div>
              <div className="w-10 h-10 flex items-center justify-center"></div>
              {days.map((day, index) => (
                <div key={day} className="w-10 h-10 flex items-center justify-center">
                  {day === 18 ? (
                    <div style={{ backgroundImage: "url('/wedding/i5.svg')" }} className="animate-sway h-[47px] w-[47px] bg-cover bg-center flex items-center justify-center text-red-500">
                      {day}
                    </div>
                  ) : (
                    <div className="w-10 h-10 flex items-center justify-center">
                      {day}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* ------------------------------------------------------------------------------------ */}

          <div className="bg-[#507c53] position: relative pt-[90px] text-[#fffdeb] pb-[90px]">
            <div className="position: absolute z-[999] top-[-30px]">
              <img src="/wedding/i4.png" alt="" />

            </div>
            <div className="pb-[30px] pl-[30px] pr-[30px]">
              <h2 className="font-['Great_Vibes',cursive] text-[50px] ">
                Місце проведення
              </h2>
              <p>Navaria Village, Наварія, Львівська область, Україна</p>
            </div>

            <a href="https://maps.app.goo.gl/8TsKPmcxDb7uXvnm7" className="flex justify-center">
              <Btn text="Локація"></Btn>
            </a>

            <img src="/wedding/i3.png" alt="" />
            <div className="position: absolute z-[999] bottom-[-40px]">
              <img src="/wedding/i4.png" alt="" />
            </div>

          </div>
          {/* ------------------------------------------------------------------------------------ */}

          <div className="bg-[#507c53] position: relative pt-[90px] text-[#fffdeb] pb-[90px] flex flex-col gap-y-[40px] text-xl">
            <div className="position: absolute z-[999] top-[-30px]">
              <img src="/wedding/i4.png" alt="" />
            </div>

            <h2 className="font-['Great_Vibes',cursive] text-[50px] ">
              Програма дня
            </h2>

            <div className="grid grid-cols-3 gap-2 px-[30px]">
              <h3 className="flex items-center justify-center">ВІНЧАННЯ</h3>

              <div style={{ backgroundImage: "url('/wedding/wedding.svg')" }} className="w-15 h-15 mx-auto bg-cover bg-center ">
              </div>
              <h3 className="flex items-center justify-center">12:00</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 px-[30px]">
              <h3 className="flex items-center justify-center text-[15px]">Церква Різдва Пресвятої Богородиці УГКЦ</h3>
              <div style={{ backgroundImage: "url('/wedding/church.svg')" }} className="w-15 h-15 mx-auto bg-cover bg-center">
              </div>

              <a href="https://maps.app.goo.gl/whvCUaD3Pe1geg9K8?g_st=it" >
                <Btn text="Локація"></Btn>
              </a>

            </div>

            <div className="grid grid-cols-3 gap-2 px-[30px]">
              <h3 className="flex items-center justify-center">БАНКЕТ</h3>
              <div style={{ backgroundImage: "url('/wedding/food.svg')" }} className="w-15 h-15 mx-auto bg-cover bg-center">
              </div>

              <h3 className="flex items-center justify-center">14:00</h3>
            </div>

            <div className="position: absolute z-[999] bottom-[-40px]">
              <img src="/wedding/i4.png" alt="" />
            </div>

          </div>

          <div ref={wishes.ref} className={`ml-[20px] mr-[20px] transition-all duration-700 ease-out
          ${wishes.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <h2 className="pt-[10px] font-['Great_Vibes',cursive] text-[50px] ">
              Побажання
            </h2>
            <img className="mx-auto h-[80px]" src="/wedding/i9.png" alt="" />
            <p>Просимо вас не дарувати нам квіти, ми не встигнемо насолодитися їх красою.
              Замість букетів будемо щасливі отримати книгу
              з Вашим підписом та побажанням —
              на згадку про цей особливий день ❤️</p>
          </div>

          {/* ---------------------------------------------------------------------------------------- */}
          <div style={{ backgroundImage: "url('/wedding/i10.jpg')" }} className="position: relative h-[600px]  bg-cover bg-center flex flex-col gap-20 text-white">
            <div className="position: absolute z-[999] top-[-30px]">
              <img src="/wedding/i4.png" alt="" />

            </div>
            <h1 className="text-[30px] mt-[90px]">
              Чекаємо на вас через:
            </h1>
            <div className="text-white flex justify-center items-center gap-3 text-4xl font-bold text-[#233c1a]">

              <div className="text-center">
                {timeLeft.days}
                <div className="text-xs font-normal">дні</div>
              </div>

              <div>:</div>

              <div className="text-center">
                {timeLeft.hours}
                <div className="text-xs font-normal">год</div>
              </div>

              <div>:</div>

              <div className="text-center">
                {timeLeft.minutes}
                <div className="text-xs font-normal">хв</div>
              </div>

              <div>:</div>

              <div className="text-center">
                {timeLeft.seconds}
                <div className="text-xs font-normal">сек</div>
              </div>

            </div>
            <div className="position: absolute z-[999] bottom-[-40px]">
              <img src="/wedding/i4.png" alt="" />
            </div>
          </div>
          {/* --------------------------------------------------------------------------- */}

          <div ref={formTitle.ref} className={`ml-[20px] mr-[20px] transition-all duration-700 ease-out
          ${formTitle.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-x-10"}`}>
            <h2 className=" font-['Great_Vibes',cursive] text-[50px] ">
              Просимо відповісти на декілька запитань:
            </h2>
          </div>


          <div className="w-full max-w-[350px] mx-auto p-2 bg-[#fffdeb] text-[#233c1a]">
            <div className="mb-4">
              <label className="block mb-1">Ваше ім’я</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-[#233c1a] p-2 rounded"
                placeholder="Введіть прізвище та ім’я"
              />
            </div>

            <div className="mb-4 flex flex-col gap-2 font-['font-indie',cursive]">

              {/* YES */}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="attending"
                  checked={attending === "Я прийду"}
                  onChange={() => setAttending("Я прийду")}
                />
                Я розділю з вами цей день
              </label>

              {/* YES + GUESTS */}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="attending"
                  checked={attending === "Прийду з табуном"}
                  onChange={() => setAttending("Прийду з табуном")}
                />
                Я буду з
              </label>

              {attending === "Прийду з табуном" && (
                <div className="mb-4">
                  <input
                    type="text"
                    value={guest}
                    onChange={(e) => setGuest(e.target.value)}
                    className="w-full border border-[#233c1a] p-2 rounded"
                    placeholder="Імена гостей"
                  />
                </div>
              )}

              {/* NO */}
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="attending"
                  checked={attending === "А ніхуя"}
                  onChange={() => setAttending("А ніхуя")}
                />
                Я нажаль не зможу
              </label>

            </div>

            {error && (
              <p className="text-red-600 mt-2 text-sm">
                {error}
              </p>
            )}
            {loading ?
              <div className=" text-[50px] ">
                <p className="text-[20px] font-['font-indie',cursive] ">Ваша відповідь успішно відправлена</p>
                <h2 className="font-['Great_Vibes',cursive]">Дякуємо!</h2>
              </div>
              :
              <div>
                <BtnD onClick={submitForm}></BtnD>
              </div>
            }

          </div>

          {/* --------------------------------------------------------------- */}
          <div style={{ backgroundImage: "url('/wedding/i2.jpg')" }} className=" position: relative h-[600px]  bg-cover bg-center text-white" >
            <div className="position: absolute z-[999] top-[-30px]">
              <img src="/wedding/i4.png" alt="" />
            </div>
            <h2 ref={title.ref} className={`pt-[60px] font-['Great_Vibes',cursive] text-[35px] transition-all duration-700 ease-out
          ${title.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-x-10"}`}>
              Будемо раді бачити вас на нашому святі!
            </h2>

          </div>

        </div>

      </div>

    </div >
  );
}
