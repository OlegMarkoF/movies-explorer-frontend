import "./Profile.css";
import { Link } from "react-router-dom";
import MoviesHeader from "../Header/MoviesHeader";

function Profile() {
  return (
    <>
      <MoviesHeader />
      <section className="profile">
        <h2 className="profile__title">Привет, Олег</h2>
      </section>
    </>
  );
}

export default Profile;
