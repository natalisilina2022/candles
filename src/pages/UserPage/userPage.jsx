import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useState, useEffect } from 'react';
import style from "../../components/Button/index.module.css"
import ContentHeader from "../../components/ContentHeader/ContentHeader";


const UserPage = ({onUpdateUser}) => {
   // используем переменные переданные через контекст 
    const { user, setIsVisible } = useContext(UserContext);
      // с помощью хука useState инициализацирем состояние переменных
  // в [] скобках первый агрумент состояние, второй ф-ция изменения состояние
  // в скобках в useState первоначальное значение переменных
    const [isShow, setisShow] = useState(false)
    const [nameUser, setName] = useState('')
    const [aboutUser, setAbout] = useState('')

    //  при нажатии кнопки изменить показываем инпуты для ввода новых данных
    const handleClickButtonEdit = (e) => {
        e.preventDefault();
        setisShow(false)
        onUpdateUser({ name: nameUser, about: aboutUser })
    }
    //  устанавливаем значения  nameUser и aboutUser при изменении user
    useEffect(() => {
        setName(user.name)
        setAbout(user.about)
    }, [user]);
//  скрываем данные пользователя при загрузке страницы
    useEffect(() => {
        setIsVisible(false)
    }, [setIsVisible])

  return (
    <div>
        <ContentHeader setIsVisible={setIsVisible} title="Страница пользователя"/>
      <div>
      {/* если user.email = true  */}
        {user.email &&
        // если isShow = true показываем инпут
          (isShow ? (
            <input
              type="text"
              value={nameUser}
              onInput={(e) => {
                setName(e.target.value);
              }}
            />
          ) : (
            // если isShow = false показываем имя пользователя
            <span>{nameUser}</span>
          ))}
        <div> </div>
        {/* если user.about = true  */}
        {user.about &&
         // если isShow = true показываем инпут
          (isShow ? (
            <input
              type="text"
              value={aboutUser}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            />
          ) : (
            // если isShow = false показываем about пользователя
            <span>{user.about}</span>
          ))}
        {!isShow ? (
          <button onClick={() => setisShow(true)} className={style.btn_reg}>
            Изменить
          </button>
        ) : (
          <button onClick={handleClickButtonEdit} className={style.btn_reg}>
            Принять
          </button>
        )}
      </div>
    </div>
  );
};

export default UserPage;
