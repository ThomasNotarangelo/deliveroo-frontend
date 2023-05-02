import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

// Components
import Meal from "./components/Meal";
import Deliveroo_logo from "./assets/images/Deliveroo_logo";

function App() {
  // State pour stocker la data
  const [data, setData] = useState();
  // State pour savoir si la data a été récupérée
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3200/");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // const { restaurtant, categories } = data;
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <header>
        <div className="container">
          <img src={Deliveroo_logo} alt="" />
        </div>
      </header>
      <section className="hero">
        <div className="container">
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="tartines" />
        </div>
      </section>
      <main>
        <div className="container">
          <section className="col-left">
            {/* Je parcours le tableau categories, chacuns des objets de ce tableau sera mentionnable sous le nom category */}
            {data.categories.map((category) => {
              // Si ma catégorie contient des plats, j'affiche une catégorie
              if (category.meals.length !== 0) {
                return (
                  <div key={category.name}>
                    {/* J'affiche le titre de ma categorie */}
                    <h2>{category.name}</h2>
                    <div className="meals-container">
                      {/* Je parcours le tableau meals contenu dans la clef meals de mon objet représentant une categorie */}
                      {category.meals.map((meal) => {
                        // J'affiche un composant Meal pour chaque objet dans le tableau meals (chaque obket représentant un plat)
                        // Je donne en props cet objet à mon composant
                        return <Meal key={meal.id} meal={meal} />;
                      })}
                    </div>
                  </div>
                );
                // Sinon rien
              } else {
                return null;
              }
            })}
          </section>
          <section className="col-right"></section>
        </div>
      </main>
    </div>
  );
}

export default App;
