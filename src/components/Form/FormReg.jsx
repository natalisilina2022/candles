import { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import api from "../../api";
import { ModalContext } from "../../context/modalContext";

const FormReg = ({ setType }) => {
  const { setActive } = useContext(ModalContext);
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
  // оправляем запрос на добавление пользователя в базу данных
  const onSubmit = async (data) => {
    try {
      await api.singUpUser(data);
      setActive(false);
      setType("in");
      setActive(true);
    } catch (error) {
      alert(error);
    }
  };
//закрываем модальное окно
  const handleClose = () => {
    setActive(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Регистрация</h3>
      <input
      // Устанавливаем поле как обязательное для заполнения, с помощью pattern устанавливаем проверку валидности email
        className={styles.input}
        {...register("email", {
          required: "Обязательное поле",
          pattern: {
            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: "Введите действительный адрес электронной почты"
          }
        })}
        type="text"
        placeholder="Email"
      />
      <div className={styles.error__form}>
        {errors?.email && <p>{errors?.email?.message}</p>}
      </div>
      <input
        className={styles.input}
        {...register("group", {
          required: "Обязательное поле",
        })}
        type="text"
        placeholder="Группа"
      />
      <div className={styles.error__form}>
         {/* если есть ошибки в заполнении поля показываем их */}
        {errors?.group && <p>{errors?.group?.message}</p>}
      </div>
      <input
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
      <p>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>
      <div className={styles.button_group}>
        <button className={styles.forms_btn} onClick={handleClose}>Отмена</button>
        <button className={styles.forms_btn}>Зарегистрироваться</button>
      </div>
    </form>
  );
};

export default FormReg;
