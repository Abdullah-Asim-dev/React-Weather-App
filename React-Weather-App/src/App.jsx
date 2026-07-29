import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [city,setCity] = useState("");
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(false);


  const getWeather = async(e)=>{

    e.preventDefault();

    if(!city) return;


    try{

      setLoading(true);

      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=1a553c4871b74c1890a152806261804&q=${city}&aqi=yes`
      );


      setData(res.data);


    }catch(err){

      console.log(err);

    }
    finally{

      setLoading(false);

    }

  }



  return (

    <main className="page">


      {/* floating background shapes */}

      <div className="orb orb1"></div>
      <div className="orb orb2"></div>



      <section className="dashboard">


        <header>

          <h1>
            Weather<span>AI</span>
          </h1>

          <p>
            Smart real-time weather dashboard
          </p>

        </header>



        <form onSubmit={getWeather} className="search">


          <input

          placeholder="Search city..."

          value={city}

          onChange={(e)=>setCity(e.target.value)}

          />


          <button>

          Search

          </button>


        </form>



        {
          loading &&

          <div className="loading">
            Fetching weather...
          </div>

        }




        {
          data &&

          <article className="weather">


            <div className="top">


              <div>

              <h2>
              {data.location.name}
              </h2>

              <p>
              {data.location.country}
              </p>

              </div>



              <img 
              src={data.current.condition.icon}
              />


            </div>




            <div className="main-temp">


              <h1>
              {data.current.temp_c}
              <sup>°C</sup>
              </h1>


              <p>
              {data.current.condition.text}
              </p>


            </div>




            <div className="cards">


              <div>

              <span>💧</span>
              <p>Humidity</p>
              <b>{data.current.humidity}%</b>

              </div>



              <div>

              <span>🌬</span>
              <p>Wind</p>
              <b>{data.current.wind_kph} km/h</b>

              </div>



              <div>

              <span>🌡</span>
              <p>Feels Like</p>
              <b>{data.current.feelslike_c}°C</b>

              </div>


            </div>



          </article>

        }


      </section>


    </main>

  )
}


export default App;