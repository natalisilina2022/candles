import { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import api from "../../api";
import { ModalContext } from "../../context/modalContext";

const FormLogin = () => {
  const { setActive, setToken } = useContext(ModalContext);
   //useForm хук для управления формами
  // подписываемся на событие изменения ввода onChange
  //register позволяет отслеживать  значения поля ввода и применить правила проверки для него
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
    // фунция отправки формы (регистрации пользователя)
  // оправляем запрос на авторизацию пользователя, при успешном результате устанавливаем переменной token в localStorage значение result.token из ответа сервера
  // иначе выводим ошибку
  const onSubmit = async (data) => {
    try {
      let result = await api.singInUser(data);
      setActive(false);
      localStorage.setItem("token", result.token);
      setToken(localStorage.getItem("token"))
    } catch (error) {
      alert(error);
      if (error === "Ошибка: 401") {
        alert("Почта или пароль введены неверно");
      } else alert(error);
    }
  };
//закрываем модальное окно
  const handleClose = () => {
    setActive(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Авторизация</h3>
      <input
      // Устанавливаем поле как обязательное для заполнения, с помощью pattern устанавливаем проверку валидности email
        className={styles.input}
        {...register("email", {
          required: "Обязательное поле",
          pattern: {
            value:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: "Введите действительный адрес электронной почты.",
          },
        })}
        type="text"
        placeholder="Email"
      />
      <div className={styles.error__form}>
         {/* если есть ошибки в заполнении поля показываем их */}
        {errors?.email && <p>{errors?.email?.message}</p>}
      </div>
      <input
      // Устанавливаем поле как обязательное для заполнения
        className={styles.input}
        {...register("password", {
          required: "Обязательное поле",
        })}
        type="text"
        placeholder="Пароль"
      />
      <div className={styles.error__form}>
         {/* если есть ошибки в заполнении поля показываем их */}
        {errors?.password && <p>{errors?.password?.message}</p>}
      </div>

      <div className={styles.button_group}>
        <button className={styles.forms_btn} onClick={handleClose}>Отмена</button>
        <button className={styles.forms_btn}>Войти</button>
      </div>
    </form>
  );
};

export default FormLogin;
