import "../../App.css";
import Nav from "../../components/Nav";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import requests from "../../api/requests";
import Footer from "../../components/Footer";
import Company from "../../components/Company";

function MainPage() {
  return (
    <div>
      <Banner />
      <Company />
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated} />
      <Row
        title="Action Movies"
        id="AM"
        fetchUrl={requests.fetchActionMovies}
      />
      <Row
        title="Comedy Movies"
        id="Cm"
        fetchUrl={requests.fetchComedyMovies}
      />
      <Row
        title="Comedy Movies"
        id="Hm"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <Row
        title="Comedy Movies"
        id="Rm"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <Row
        title="Comedy Movies"
        id="Do"
        fetchUrl={requests.fetchDocumentaries}
      />
      <Footer></Footer>
    </div>
  );
}

export default MainPage;
