import React from "react";
import { useNavigate } from "react-router-dom";
import s from './ContentHeader.module.css';
import { ReactComponent as Arrow} from './img/leftArrow.svg';
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const ContentHeader = ({title, children }) => {
    const { setIsVisible } = useContext(UserContext);
    // useNavigate отслеживает историю перемещения по ссылкам
    const navigate = useNavigate();
    return (
    <div>
        {/* при клике на кнопку назад переходим на страницу, на которой были до этого и показываем данные пользователя */}
       <button className={s.buttonBack} onClick={() => {navigate(-1); setIsVisible(true);}}> <Arrow/>Назад</button>
       <h1 className={s.title}>{title}</h1>
       {children}
    </div>
    );
};

export default ContentHeader;