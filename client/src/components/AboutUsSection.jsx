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
       title: "Fast Refresh",
       desc: "Fast Refresh ensures that any updates or changes you make to your profile, property listings, or roommate preferences are instantly reflected on the app. Whether you're uploading new photos, updating your description, or modifying your search criteria, you can see the results in real-time.",
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
       title: "Analytics",
       desc: "Gain valuable insights and make data-driven decisions with LA CASA's powerful Analytics feature. With Analytics, you can access comprehensive reports and metrics that provide a deeper understanding of your flatsharing and house renting activities. ",
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
       title: "Datacenter security",
       desc: "We prioritize the security and protection of your data. Our state-of-the-art datacenters are equipped with top-notch security measures to ensure the confidentiality and integrity of your personal information. ",
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
       title: "Build on your terms",
       desc: "LA CASA empowers you to build your flatsharing and house renting journey on your own terms. With our user-friendly app, you have the flexibility and control to tailor your experience according to your preferences and objectives.",
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
       title: "Safe to use",
       desc: "We prioritize your safety and implement strict verification processes to foster a secure and reliable community.",
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
       desc: "Our app is designed to provide you with maximum flexibility throughout your journey. Whether you're a homeowner or a tenant, LA CASA offers a range of flexible options to accommodate your needs.",
     },
   ];

    return (
      <section className="py-14 mb-10" id="about">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="relative max-w-2xl mx-auto sm:text-center ">
            <div className="relative z-10 mt-14">
              <h3 className="text-gray-500 text-3xl font-extrabold sm:text-4xl">
                About us
              </h3>
              <p className="mt-6 text-gray-500">
                At LA CASA, we believe that finding a home or compatible
                roommates should be an exciting and stress-free journey. Our
                mission is to revolutionize the way people connect and discover
                their ideal living spaces, whether it's finding a cozy apartment
                or seeking trustworthy roommates for flatsharing. We're
                dedicated to making the process simple and enjoyable for both
                tenants and homeowners.
              </p>
              <p className="mt-3 text-gray-500">
                With LA CASA, you can effortlessly search for your dream home or
                explore flatsharing opportunities that suit your lifestyle. Our
                user-friendly app connects you with a diverse community of
                individuals seeking roommates, fostering a sense of belonging
                and shared experiences. Whether you're looking to rent out a
                spare room or find the perfect flatmate, we're here to
                facilitate connections and create harmonious living
                arrangements.
              </p>
              <p className="mt-3 text-gray-500">
                We prioritize safety, trust, and transparency, implementing
                stringent verification processes to ensure a secure environment
                for all users. LA CASA provides a streamlined platform where you
                can post your property or create roommate profiles, browse
                through compatible options, and connect with potential roommates
                or tenants seamlessly.
              </p>
              <p className="mt-3 text-gray-500">
                Join LA CASA today and embark on an exciting journey to find not
                only your perfect home but also the ideal roommates for an
                enriching flatsharing experience. Let us redefine the way you
                discover your ideal living space and create lasting connections.
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
          <div className="relative mt-12">
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, idx) => (
                <li
                  key={idx}
                  className="bg-white space-y-3 p-4 border rounded-lg"
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