// import React from 'react'
// import './Home.css'
// import Header from '../../components/Header/Header'
// import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'

// const Home = () => {
// const [category,setCategory] =  useState("All");

//   return (
//     <div>
//       <Header/>
//       <ExploreMenu category = {category} setCategory={ setCategory}/>
//     </div>
//   )
// }

// export default Home


// import React, { useState } from 'react';
// import './Home.css';
// import Header from '../../components/Header/Header';
// import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
// import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

// const Home = () => {
//   const [category, setCategory] = useState("All");

//   return (
//     <div>
//       <Header />
//       <ExploreMenu category={category} setCategory={setCategory} />
//       <FoodDisplay category={category}/>
//     </div>
//   );
// };

// export default Home;


import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';


const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  );
};

export default Home;
