import Modal from "../modal/Modal";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/modalContext";
import FormLogin from "../Form/FormLogin";
import FormReg from "../Form/FormReg";
import "../App/index.css";
import style from "../Button/index.module.css"

const Registration = () => {
  // передаем переменную setActive через контекст модального окна
  const { setActive } = useContext(ModalContext);
    // с помощью хука useState инициализацирем состояние переменных
  // в [] скобках первый агрумент состояние, второй ф-ция изменения состояние
  // в скобках в useState первоначальное значение переменных
  const [type, setType] = useState("");
  // функция открытия модального окна регистрации
  const handleSingUp = () => {
    setType("up");
    setActive(true);
  };
  // функция открытия модального окна авторизации
  const handleSingIn = () => {
    setType("in");
    setActive(true);
  };
  return (
    <div>
      <button className={style.btn_reg} onClick={handleSingUp}>
        Регистрация
      </button>
      <button className={style.btn_reg} onClick={handleSingIn}>
        Авторизация
      </button>
      {/* в зависимости от переданного типа открывается модальное окно с соответствующим содержанием  */}
      <Modal>
        {type === "up" && <FormReg setType={setType} />}
        {type === "in" && <FormLogin />}
      </Modal>
    </div>
  );
};

export default Registration;