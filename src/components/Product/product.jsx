import s from "./index.module.css";
import cn from "classnames";
import { ReactComponent as Save } from "../Card/save.svg";
import truck from "../../assets/images/truck.svg";
import quality from "../../assets/images/quality.svg";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";
import { calcDiscountPrice, isLiked, calcPriceFor100 } from "../../utils";
import Modal from "../modal/Modal";
import Form from "../Form/Form";
import Reviews from "../Reviews/Reviews";
import { ModalContext } from "../../context/modalContext";
import style from "../Button/index.module.css";

export const Product = ({
  onProductLike,
  pictures,
  likes = [],
  reviews,
  tags,
  name,
  price,
  discount,
  description,
  wight,
  _id,
}) => {
   // используем переменные переданные через контекст
  const { user } = useContext(UserContext);
  const { setActive } = useContext(ModalContext);

  // расчитываем цену со скидкой
  const discount_price = calcDiscountPrice(price, discount);
  const priceFor100 = calcPriceFor100(discount_price, wight);
  //объявляем переменную с значением лайка товара
  const liked = isLiked(likes, user._id);
// с помощью хука useState инициализацирем состояние переменных
  // в [] скобках первый агрумент состояние, второй ф-ция изменения состояние
  // в скобках в useState первоначальное значение переменных
  const [open, setOpen] = useState(false);
  const [currentReviews, setCurrentReviews] = useState();

  // устанавливаем значение переменной развое массиву отзывов, при изменении reviews массив отзывов обновится 
  useEffect(() => {
    setCurrentReviews(reviews);
  }, [reviews]);

  // функция открытия модального окна
  const handleClick = () => {
    setActive(true);
  };

  return (
    <>
      <div>
        <h1 className={s.title}>{name}</h1>
      </div>

      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img src={pictures} alt={`Изображение ${name}`} />
        </div>
        <div className={s.desc}>
          <span className={discount ? s.oldPrice : s.price}>
            {price}&nbsp;₽
          </span>
            {/* если скидка на товар существуем расчитываем цену со скидкой */}
          {discount !== 0 && (
            <span className={cn(s.price, "card__price_type_discount")}>
              {discount_price}&nbsp;₽
            </span>
          )}
          <div className={s.btnWrap}>
            <div className={s.left}>
              <button className={s.minus}>-</button>
              <span className={s.num}>0</span>
              <button className={s.plus}>+</button>
            </div>
            <a href="/#" className={cn("btn", "btn_type_primary", s.cart)}>
              В корзину
            </a>
          </div>
          <button
            className={cn("card__favorite", {
              "card__favorite_is-active": liked,
            })}
            onClick={onProductLike}
          >
            <Save className="card__favorite-icon" />
            {/* в зависимости от значения liked истанавливаем значение span */}
            <span>{liked ? "В избранном" : "В избранное"}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <p className={s.subtitle}>{description}</p>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>{wight}</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>{priceFor100} ₽ за 100 грамм</div>
        </div>
        <div>
          <button
            className="card__cart btn btn_type_primary"
            onClick={handleClick}
          > Оставить отзыв
          </button>
          <div className={s.reviewTitle__box}>
            <h3 className={s.title}>Отзывы</h3>
            <button
              className={style.btn_reg}
              onClick={() => {
                setOpen(!open);
              }}
            >
              {/* если open=true пишем Закрыть , если false - Открыть */}
              {!open ? "Открыть " : "Закрыть"}
            </button>
          </div>
           {/* если open=true показываем отзывы */}
          {open && <Reviews reviews={currentReviews} />}
        </div>
        <Modal>
          <Form id={_id} setCurrentReviews={setCurrentReviews} />
        </Modal>
      </div>
    </>
  );
};
