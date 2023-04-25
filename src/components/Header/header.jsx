import s from "./index.module.css";
import style from "../Button/index.module.css";
import cn from "classnames";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

import api from "../../api";
import Registration from "../Registration/Registration";
import { Link } from "react-router-dom";

function Header({ children }) {
  // используем переменные переданные через контекст
  const { user, isVisible } = useContext(UserContext);
  return (
    <header className={cn(s.header, "cover")}>
      <div className="container">
        <div className={s.wrapper}>
          {children}
          {/*  если api._token существует и isVisible= true показываем данные пользователя */}
          {api._token ? (
            isVisible && (
              <div className={s.profile}>
                {user.email && <span>{user.name}</span>}
                <div> </div>
                {user.about && <span>{user.about}</span>}
                <Link to={`/user`} className={style.btn_reg}>
                  Изменить
                </Link>
              </div>
            )
          ) : (
            // если api._token не существует открываем регистрацию
            <div
              style={{ height: "40px", display: "flex", alignItems: "center" }}
            >
              <Registration />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
