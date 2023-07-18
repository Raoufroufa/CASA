import React from 'react'

const TermsPage = () => {
  const features = [
    {
      title: "Acceptance of Terms",
      desc: "By accessing and using the LA CASA app, you agree to abide by the terms and conditions set forth in this agreement. If you do not agree with any of these terms, please refrain from using our app.",
    },
    {
      title: "User Eligibility",
      desc: "LA CASA is intended for individuals who are at least 18 years old. By accessing and using our app, you confirm that you meet the age requirement and have the legal capacity to enter into this agreement.",
    },
    {
      title: "Account Registration",
      desc: "To fully utilize the features of LA CASA, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
    },
    {
      title: "User Conduct",
      desc: "As a user of LA CASA, you agree to use the app in a responsible and lawful manner. You must not engage in any activities that violate applicable laws or infringe upon the rights of others. This includes, but is not limited to, providing false information, engaging in fraudulent behavior, or engaging in any form of harassment or discrimination.",
    },
    {
      title: "Modification of Terms",
      desc: "LA CASA reserves the right to modify or update these terms at any time. It is your responsibility to review these terms periodically to stay informed of any changes.",
    },
    {
      title: "Intellectual Property",
      desc: "All intellectual property rights related to LA CASA, including its logo, design, and content, are the property of LA CASA or its licensors. You are prohibited from using, reproducing, or modifying any of these intellectual property rights without prior written consent.",
    },
  ];

  return (
    <section className="py-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="max-w-xl space-y-3">
          <h3 className="text-primary font-bold text-lg">Terms</h3>
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Welcome to LA CASA!
          </p>
          <p>
            Before using our app, it's important to review and understand the
            terms and conditions that govern your usage. Please take a moment to
            read the following terms, as they outline your rights and
            responsibilities as a user of LA CASA.
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