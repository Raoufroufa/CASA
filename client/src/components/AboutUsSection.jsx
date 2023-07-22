import React from 'react'

const AboutUs = () => {
   const features = [
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
             d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
           />
         </svg>
       ),
       title: "Actualisation rapide",
       desc: "L'actualisation rapide garantit que toutes les mises à jour ou modifications que vous apportez à votre profil, aux listes de propriétés ou aux préférences de colocataire sont instantanément répercutées sur l'application. Que vous téléchargiez de nouvelles photos, mettiez à jour votre description ou modifiiez vos critères de recherche, vous pouvez voir les résultats en temps réel.",
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
             d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
           />
         </svg>
       ),
       title: "Analytique",
       desc: "Obtenez des informations précieuses et prenez des décisions basées sur les données grâce à la puissante fonctionnalité d'analyse de LA CASA. Avec Analytics, vous pouvez accéder à des rapports et des mesures complets qui permettent de mieux comprendre vos activités de colocation et de location de maison. ",
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
             d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
           />
         </svg>
       ),
       title: "Sécurité du centre de données",
       desc: "Nous privilégions la sécurité et la protection de vos données. Nos centres de données à la fine pointe de la technologie sont équipés de mesures de sécurité de premier ordre pour assurer la confidentialité et l'intégrité de vos renseignements personnels. ",
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
             d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
           />
         </svg>
       ),
       title: "Construisez selon vos conditions",
       desc: "LA CASA vous permet de construire votre parcours de colocation et de location de maison selon vos propres conditions. Grâce à notre application conviviale, vous avez la flexibilité et le contrôle nécessaires pour personnaliser votre expérience en fonction de vos préférences et de vos objectifs.",
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
             d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
           />
         </svg>
       ),
       title: "Sûr à utiliser",
       desc: "Nous accordons la priorité à votre sécurité et mettons en œuvre des processus de vérification stricts pour favoriser une communauté sécurisée et fiable.",
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
             d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
           />
         </svg>
       ),
       title: "Flexible",
       desc: "Notre application est conçue pour vous offrir un maximum de flexibilité tout au long de votre voyage. Que vous soyez propriétaire ou locataire, LA CASA offre une gamme d'options flexibles pour répondre à vos besoins.",
     },
   ];

    return (
      <section
        className="py-14 mb-10 mx-auto max-w-screen-xl  px-4 items-center lg:flex md:px-8"
        id="about"
      >
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="relative max-w-2xl mx-auto sm:text-center  ">
            <div className="relative z-10 mt-14">
              <h3 className="text-gray-500 text-3xl font-extrabold sm:text-4xl">
                À propos de nous
              </h3>
              <p className="mt-6 text-gray-500 text-lg">
                Chez <strong className="text-primary ">LA CASA</strong>, nous
                croyons que trouver un logement ou des colocataires compatibles
                devrait être un voyage passionnant et sans stress. Notre mission
                est de révolutionner la façon dont les gens se connectent et
                découvrent leurs espaces de vie idéaux, qu'il s'agisse de
                trouver un appartement confortable ou de rechercher des
                colocataires de confiance pour une colocation. Nous nous
                engageons à rendre le processus simple et agréable pour les
                locataires et les propriétaires.
              </p>
              <p className="mt-3 text-gray-500 text-lg">
                Avec <strong className="text-primary ">LA CASA</strong>, vous
                pouvez facilement rechercher la maison de vos rêves ou explorer
                les opportunités de colocation qui correspondent à votre style
                de vie. Notre application conviviale vous connecte à une
                communauté diversifiée de personnes à la recherche de
                colocataires, favorisant un sentiment d'appartenance et des
                expériences partagées. Que vous cherchiez à louer une chambre
                d'amis ou à trouver le colocataire idéal, nous sommes là pour
                faciliter les connexions et créer des conditions de vie
                harmonieuses.
              </p>
              <p className="mt-3 text-gray-500 text-lg">
                Nous accordons la priorité à la sécurité, à la confiance et à la
                transparence, en mettant en œuvre des processus de vérification
                rigoureux pour garantir un environnement sécurisé pour tous les
                utilisateurs. <strong className="text-primary ">LA CASA</strong>{" "}
                fournit une plate-forme simplifiée où vous pouvez publier votre
                propriété ou créer des profils de colocataires, parcourir les
                options compatibles et vous connecter avec des colocataires ou
                des locataires potentiels de manière transparente.
              </p>
              <p className="mt-3 text-gray-500 text-lg">
                Rejoignez <strong className="text-primary ">LA CASA</strong>{" "}
                aujourd'hui et embarquez dans un voyage passionnant pour trouver
                non seulement votre maison idéale, mais aussi les colocataires
                idéaux pour une expérience de colocation enrichissante.
                Laissez-nous redéfinir la façon dont vous découvrez votre espace
                de vie idéal et créons des liens durables.
              </p>
            </div>
            <div
              className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]"
              style={{
                background:
                  "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
              }}
            ></div>
          </div>
          <div className="relative mt-20">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, idx) => (
                <li
                  key={idx}
                  className="bg-white space-y-3 p-4 border border-gray-200 shadow-xl rounded-lg mt-8"
                >
                  <div className="text-primary pb-3">{item.icon}</div>
                  <h4 className="text-lg text-gray-800 font-semibold">
                    {item.title}
                  </h4>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
}

export default AboutUs