import React from 'react';
import { HashLink as NavLink } from "react-router-hash-link";

const FaqsPage = () => {
    const faqsList = [
      {
        q: "How do I create an account on LA CASA?",
        a: "To create an account on LA CASA, simply download the app from the App Store or Google Play Store and follow the registration process. You'll be asked to provide some basic information and create a password to access your account.",
      },
      {
        q: "How can I post my property for rent on LA CASA?",
        a: "Posting your property for rent on LA CASA is easy! Once you've created an account, navigate to the Add new Property section and follow the prompts to add details about your property, including photos, descriptions, and rental terms. Once you've completed the listing, it will be visible to potential tenants on the app.",
      },
      {
        q: "How can I contact the support team for assistance?",
        a: "You can reach out to us by navigating to the Contact Us section of the app. There, you'll find options to submit a support ticket, email our team, or access our customer service hotline",
      },
      {
        q: "How can I edit or update my property listing or roommate profile?",
        a: "To edit or update your property listing or roommate profile, log into your LA CASA account and navigate to the Manage Listings or Manage Profiles section. From there, you can make changes to your listings, including updating descriptions, adding or removing photos, or modifying rental terms.",
      },
      {
        q: "How can I report suspicious or inappropriate behavior?",
        a: "If you encounter any suspicious or inappropriate behavior on LA CASA, please report it immediately. We take all reports seriously and will take appropriate action to maintain a safe and inclusive community.",
      },
    ];

    return (
        <section className='py-14'>
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
                    <h3 className="text-gray-800 text-3xl font-extrabold sm:text-4xl">
                        How can we help?
                    </h3>
                    <p className="text-gray-600">
                        Everything you need to know about the product. Can’t find the answer you’re looking for? feel free to {" "}
                        <NavLink 
                            className='text-primary font-semibold whitespace-nowrap'
                            to={'/#contact'}>
                            contact us
                        </NavLink>.
                    </p>
                   
                </div>
                <div className='mt-16'>
                    <ul className='space-y-8 gap-12 grid-cols-2 sm:grid sm:space-y-0 lg:grid-cols-3'>
                        {faqsList.map((item, idx) => (
                            <li
                                key={idx}
                                className="space-y-3"
                            >
                                <summary
                                    className="flex items-center justify-between font-semibold text-gray-700">
                                    {item.q}
                                </summary>
                                <p
                                    dangerouslySetInnerHTML={{ __html: item.a }}
                                    className='text-gray-600 leading-relaxed'>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FaqsPage