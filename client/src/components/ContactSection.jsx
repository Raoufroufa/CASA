import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');


  const contactMethods = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      contact: "Bab Ezzaour, Algiers, Algeria.",
      title: "Notre bureau",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      ),
      contact: "+213 (555) 000-000",
      title: "Téléphone",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      ),
      contact: "la-casa@gmail.com",
      title: "E-mail",
    },
  ];

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("/users/subscribe", {
          email,
        });
        setMessage(response.data.message);
        setEmail("")
        window.location.href("/");
      } catch (error) {
        setMessage("Subscription failed");
      }
    };

  return (
    <div id="contact" className="mt-40">
      <main className="py-14 bg-gray-50 shadow-2xl  mx-auto max-w-screen-xl">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-xl space-y-3">
            <h3 className="text-primary text-3xl font-extrabold sm:text-4xl">
              Contactez-nous
            </h3>
            <p className="text-gray-600 text-2xl font-semibold sm:text-3xl">
              Laissez-nous savoir comment nous pouvons vous aider
            </p>
            <p className=" text-gray-500">
              Nous sommes là pour vous aider et répondre à toute question que
              vous pourriez avoir, nous attendons avec impatience de vous
              entendre.
            </p>
          </div>
          <div>
            <ul className="mt-12 flex flex-wrap gap-x-12 gap-y-6 items-center lg:gap-x-24">
              {contactMethods.map((item, idx) => (
                <li key={idx}>
                  <h4 className="text-gray-600 text-xl font-medium">
                    {item.title}
                  </h4>
                  <div className="mt-3 flex items-center gap-x-3">
                    <div className="flex-none text-primary">{item.icon}</div>
                    <p>{item.contact}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <section className="py-14  mt-6 mx-auto max-w-screen-xl ">
        <div className="relative overflow-hidden mx-4 px-4 py-14 rounded-xl bg-primary md:px-8 md:mx-8">
          <div className="relative z-10 max-w-xl mx-auto sm:text-center">
            <div className="space-y-3">
              <h3 className="text-3xl text-white font-bold">
                Abonnez-vous à notre newsletter
              </h3>
              <p className="text-blue-100 leading-relaxed">
                Restez au courant des progrès de la feuille de route, des
                annonces et des remises exclusives, n'hésitez pas à vous
                inscrire avec votre e-mail.
              </p>
            </div>
            <div className="mt-6">
              <form
                onSubmit={handleFormSubmit}
                className="flex items-center justify-center bg-white rounded-lg p-2 sm:max-w-md sm:mx-auto gap-4 px-4"
              >
                <input
                  type="email"
                  placeholder="Entrer votre Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-gray-500 w-full p-2 outline-none"
                />
                <button
                  type="submit"
                  className="p-2 px-3 rounded-lg font-medium text-white bg-primaryH hover:bg-blue-500 active:bg-blue-700 duration-150 outline-none shadow-md focus:shadow-none sm:px-4"
                >
                  S'abonner
                </button>
              </form>
              {message && (
                <div className="mt-3  font-bold text-red-800 ">{message}</div>
              )}
              <p className="mt-3 max-w-lg text-[15px] text-blue-100 sm:mx-auto">
                Jamais de spam, nous nous soucions de la protection de vos
                données. Lisez notre{" "}
                <a href="/terms" className="font-extrabold hover:text-gray-800">
                  {" "}
                  Conditions{" "}
                </a>
              </p>
            </div>
          </div>
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background:
                "linear-gradient(268.24deg, rgba(59, 130, 246, 0.76) 50%, rgba(59, 130, 246, 0.545528) 80.61%, rgba(55, 48, 163, 0) 117.35%)",
            }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
