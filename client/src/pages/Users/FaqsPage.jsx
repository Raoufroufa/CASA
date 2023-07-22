import React from 'react';
import { HashLink as NavLink } from "react-router-hash-link";

const FaqsPage = () => {
    const faqsList = [
      {
        q: "Comment créer un compte sur LA CASA ?",
        a: "Pour créer un compte sur LA CASA, ouvrez simplement l'application et suivez le processus d'inscription. Il vous sera demandé de fournir quelques informations de base et de créer un mot de passe pour accéder à votre compte.",
      },
      {
        q: "Comment publier mon bien en location sur LA CASA ?",
        a: "Publier votre bien à louer sur LA CASA, c'est facile ! Une fois que vous avez créé un compte, accédez à la section Ajouter une nouvelle propriété et suivez les invites pour ajouter des détails sur votre propriété, y compris des photos, des descriptions et des conditions de location. Une fois que vous avez terminé la liste, elle sera visible par les locataires potentiels sur l'application.",
      },
      {
        q: "Comment publier ma recherche sur LA CASA ?",
        a: "Publier votre recherche de location ou colocation sur LA CASA, c'est facile ! Une fois que vous avez créé un compte, accédez à la section Ajouter une nouvelle pupblication et suivez les invites pour ajouter des détails sur votre publication, y compris des descriptions et des conditions de location. Une fois que vous avez terminé la liste, elle sera visible par les utilisateurs potentiels sur l'application.",
      },
      {
        q: "Comment puis-je contacter l'équipe d'assistance pour obtenir de l'aide ?",
        a: "Vous pouvez nous contacter en accédant à la section Contactez-nous de l'application. Vous y trouverez des options pour soumettre un ticket d'assistance, envoyer un e-mail à notre équipe ou accéder à notre hotline de service client.",
      },
      {
        q: "Comment puis-je modifier ou mettre à jour ma fiche de propriété ou ma publication?",
        a: "Pour modifier ou mettre à jour votre annonce de propriété ou votre publication, connectez-vous à votre compte LA CASA et accédez à votre  profil. À partir de là, vous pouvez apporter des modifications à vos annonces, notamment mettre à jour les descriptions, ajouter ou supprimer des photos ou modifier les conditions de location.",
      },
      {
        q: "Comment puis-je signaler un comportement suspect ou inapproprié ?",
        a: "Si vous rencontrez un comportement suspect ou inapproprié sur LA CASA, veuillez le signaler immédiatement. Nous prenons tous les signalements au sérieux et prendrons les mesures appropriées pour maintenir une communauté sûre et inclusive.",
      },
    ];

    return (
      <section className="py-14 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
            <h3 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">
              Comment pouvons nous aider?
            </h3>
            <p className="text-gray-600">
              Tout ce que vous devez savoir sur le produit. Vous ne trouvez pas
              la réponse que vous cherchez ? ne hésitez pas à{" "}
              <NavLink
                className="text-primary font-semibold whitespace-nowrap"
                to={"/#contact"}
              >
                nous contacter
              </NavLink>
              .
            </p>
          </div>
          <div className="mt-16">
            <ul className="space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3">
              {faqsList.map((item, idx) => (
                <li key={idx} className="space-y-3">
                  <summary className="flex items-center justify-between font-semibold text-gray-700">
                    {item.q}
                  </summary>
                  <p
                    dangerouslySetInnerHTML={{ __html: item.a }}
                    className="text-gray-600 leading-relaxed"
                  ></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
};

export default FaqsPage