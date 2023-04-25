import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import s from "../../components/Button/index.module.css";
import { useParams } from "react-router-dom";
import { Product } from "../../components/Product/product";
import Spinner from "../../components/Spinner/Spinner";
import { useApi } from "../../hooks/useApi";
import api from "../../api";

export const ProductPage = ({ handleLike }) => {
  // useNavigate отслеживает историю перемещения по ссылкам
  const navigate = useNavigate();
  //useParams() возвращает набор параметров маршрута, получаем id товара из url
  const { productId } = useParams();
  // useCallback возвращает один и тот же экземпляр передаваемой функции
  //  не вызываем заново пока id  не изменится
  const handleGetProduct = useCallback(
    () => api.getProductById(productId),
    [productId]
  );

  const {
    data: product,
    setData: setProduct,
    loading: isLoading,
    error: errorState,
  } = useApi(handleGetProduct);

  // useCallback возвращает один и тот же экземпляр передаваемой функции
  // не вызываем заново пока product или handleLike или setProduct не изменятся
  const handleProductLike = useCallback(() => {
    handleLike(product).then((updateProduct) => {
      setProduct(updateProduct);
    });
  }, [product, handleLike, setProduct]);

  return (
    <>
      <div className="content__cards">
        <div>
          <button className={s.btn_reg} onClick={() => navigate(-1)}>
            Назад
          </button>
        </div>
        {/* если не загрузили товар показываем спинер */}
        {isLoading ? (
          <Spinner />
        ) : (
          // если нет ошибок при загрузке показываем товар 
          !errorState && (
            <Product
              {...product}
              setProduct={setProduct}
              onProductLike={handleProductLike}
            />
          )
        )}
      </div>
    </>
  );
};
