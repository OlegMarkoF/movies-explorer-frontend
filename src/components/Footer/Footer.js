import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
        <p className="footer__about">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__box">
          <p className="footer__year">© 2023</p>
          <div className="footer__links">
            <a className="footer__yp" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
            <a className="footer__git" href="https://github.com/yandex-praktikum/">Github</a>
          </div>
        </div>
    </footer>
  )
}

export default Footer;