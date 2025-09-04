// "use client";
// import React from 'react';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import FeaturedUniversities from './components/FeaturedUniversities';
// import Footer from './components/Footer';

// export default function Home() {
//   return (
//     <div>
//       <Header />
//       <main>
//         <Hero />
//         <FeaturedUniversities />
//       </main>
//       <Footer />
//     </div>
//   );
// }


"use client";
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedUniversities from './components/FeaturedUniversities';
import UpcomingExams from './components/UpcomingExams';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <main id="main-content">
        <Hero />
        <FeaturedUniversities />
        <UpcomingExams />
      </main>
      <Footer />
    </div>
  );
}