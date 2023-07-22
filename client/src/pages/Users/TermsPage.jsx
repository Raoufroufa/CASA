import React from 'react'

const TermsPage = () => {
  const features = [
    {
      title: "Acceptation des conditions",
      desc: "En accédant et en utilisant l'application LA CASA, vous acceptez de respecter les termes et conditions énoncés dans le présent accord. Si vous n'êtes pas d'accord avec l'une de ces conditions, veuillez vous abstenir d'utiliser notre application.",
    },
    {
      title: "Admissibilité des utilisateurs",
      desc: "LA CASA est destinée aux personnes âgées d'au moins 18 ans. En accédant et en utilisant notre application, vous confirmez que vous remplissez les conditions d'âge et que vous avez la capacité juridique de conclure cet accord.",
    },
    {
      title: "Enregistrement du Compte",
      desc: "Pour utiliser pleinement les fonctionnalités de LA CASA, vous devrez peut-être créer un compte. Vous êtes responsable du maintien de la confidentialité des informations d'identification de votre compte et de toutes les activités qui se produisent sous votre compte.",
    },
    {
      title: "Conduite de l'utilisateur",
      desc: "En tant qu'utilisateur de LA CASA, vous vous engagez à utiliser l'application de manière responsable et licite. Vous ne devez pas vous engager dans des activités qui enfreignent les lois applicables ou enfreignent les droits d'autrui. Cela inclut, mais sans s'y limiter, fournir de fausses informations, adopter un comportement frauduleux ou se livrer à toute forme de harcèlement ou de discrimination.",
    },
    {
      title: "Modification des conditions",
      desc: "LA CASA se réserve le droit de modifier ou de mettre à jour ces conditions à tout moment. Il est de votre responsabilité de revoir ces conditions périodiquement pour rester informé de tout changement.",
    },
    {
      title: "Propriété intellectuelle",
      desc: "Tous les droits de propriété intellectuelle liés à LA CASA, y compris son logo, sa conception et son contenu, sont la propriété de LA CASA ou de ses concédants. Il vous est interdit d'utiliser, de reproduire ou de modifier l'un quelconque de ces droits de propriété intellectuelle sans autorisation écrite préalable.",
    },
  ];

  return (
    <section className="py-10 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-xl space-y-3">
          <h3 className="text-primary font-bold text-lg">Conditions</h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Bienvenue à LA CASA!
          </p>
          <p>
            Avant d'utiliser notre application, il est important d'examiner et
            de comprendre les termes et conditions qui régissent votre
            utilisation. Veuillez prendre un moment pour lire les conditions
            suivantes, car elles décrivent vos droits et responsabilités en tant
            qu'utilisateur de LA CASA.
          </p>
        </div>
        <div className="mt-12">
          <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li key={idx} className="space-y-3">
                <div className="w-12 h-12 border text-indigo-600 rounded-lg flex items-center justify-center">
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
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
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

export default TermsPage