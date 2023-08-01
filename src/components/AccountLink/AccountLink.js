import { Link } from "react-router-dom";
import "./AccountLink.css";

function AccountLink({ onClose }) {
  return (
    <Link
      to="/profile"
      onClick={onClose}
      className="account-link">
        Аккаунт
    </Link>
  )
}

export default AccountLink;