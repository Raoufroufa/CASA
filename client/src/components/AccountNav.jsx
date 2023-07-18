import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

function AccountNav() {
  const { decodedToken } = useContext(UserContext);

 const { pathname } = useLocation();
 let subpage = pathname.split("/")?.[2];
 if (subpage === undefined) {
   subpage = "profile";
    }
    
 function linkClasses(type = null) {
   let classes =
     "inline-flex gap-2 py-2 px-5 rounded-full text-sm md:text-lg justify-center items-center text-gray-700 ";
   if (type === subpage) {
     classes += " bg-primary text-white";
   } else {
     classes += " bg-gray-200";
   }
   return classes;
    }
    
 return (
   <nav className="w-full md:flex justify-center mt-14 gap-4 mb-8">
     <div className="flex flex-wrap justify-center md:justify-start gap-3 gap-y-4">
       <Link className={linkClasses("profile")} to={"/account"}>
         <svg
           xmlns="http://www.w3.org/2000/svg"
           fill="none"
           viewBox="0 0 24 24"
           strokeWidth={1.5}
           stroke="currentColor"
           className="w-5 h-5 md:w-6 m:h-6"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
           />
         </svg>
         My profile
       </Link>
       {decodedToken?.role === "Owner" ? (
         <>
           <Link
             className={linkClasses("properties")}
             to={"/account/properties"}
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-5 h-5 md:w-6 m:h-6"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
               />
             </svg>
             My properties
           </Link>
           <Link
             className="inline-flex gap-2 py-2 px-6 rounded-full text-sm md:text-lg justify-center items-center text-gray-700 bg-gray-200"
             to={"/properties"}
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-5 h-5 md:w-6 m:h-6"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
               />
             </svg>
             Properties
           </Link>
           <Link
             className="inline-flex gap-2 py-2 px-6 rounded-full text-sm md:text-lg justify-center items-center text-gray-700 bg-gray-200"
             to={"/posts"}
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-5 h-5 md:w-6 m:h-6"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
               />
             </svg>
             Posts
           </Link>
         </>
       ) : (
         <>
           <Link className={linkClasses("posts")} to={"/account/posts"}>
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-5 h-5 md:w-6 m:h-6"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
               />
             </svg>
             My posts
           </Link>
           <Link
             className="inline-flex gap-2 py-2 px-6 rounded-full text-sm md:text-lg justify-center items-center text-gray-700 bg-gray-200"
             to={"/posts"}
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-5 h-5 md:w-6 m:h-6"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
               />
             </svg>
             Posts
           </Link>
           <Link
             className="inline-flex gap-2 py-2 px-6 rounded-full text-sm md:text-lg justify-center items-center text-gray-700 bg-gray-200"
             to={"/properties"}
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-5 h-5 md:w-6 m:h-6"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
               />
             </svg>
             Properties
           </Link>
         </>
       )}
     </div>
   </nav>
 );
}

export default AccountNav