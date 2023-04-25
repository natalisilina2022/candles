import { useState, useEffect } from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";
import Logo from "../Logo/logo";
import Search from "../Search/search";
import "./index.css";
import api from "../../api";
import useDebounce from "../../hooks/useDebounce";
import SearchInfo from "../SearchInfo";
import { Route, Routes } from "react-router-dom";
import { ProductPage } from "../../pages/ProductPage/product-page";
import { NotFoundPage } from "../../pages/NotFoundPage/not-found-page";
import { UserContext } from "../../context/userContext";
import { ModalContext } from "../../context/modalContext";
import { CardContext } from "../../context/cardContext";
import { CatalogPage } from "../../pages/CatalogPage/catalog-page";
import FAQPage from "../../pages/FAQPage/FAQPage";
import UserPage from "../../pages/UserPage/userPage";

function App() {
  // с помощью хука useState инициализируем состояние переменных
  // в [] скобках первый агрумент состояние, второй ф-ция изменения состояние
  // в скобках в useState первоначальное значение переменных
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [currentSort, setCurrentSort] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(false)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [isVisible, setIsVisible] = useState(true);
  //useDebounce хук, который позволяет отложить запросы к серверу, что бы они не происходили слишком часто при наборе текста при поиске
  //в данном случае устанавливается задержка в 1 секунду между запросами
  const debounceValue = useDebounce(searchQuery, 1000);

  // функция запроса товаров в соответствии с введенным полем поиска searchQuery
  const handleRequest = async (debounceValue) => {
    try {
      // filterCards отфильтрованный массив товаров в соответствии с полем поиска searchQuery
      const filterCards = await api.search(debounceValue);
      setCards(filterCards.filter((product) => product.author._id === currentUser._id ));
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  };

//useEffect позволяет запускать побочные эффекты при монтировании и обновлении компонента
// в массив зависимостей внесена переменная debounceValue, состояние которой отслеживает useEffect
  useEffect(() => {
    if (api._token) {
      handleRequest(debounceValue);
    }
  }, [debounceValue]);

  // если токен существует делаем запрос к серверу для получения списка товаров и информации о пользователе
  // список хранится в cards
  // информация о пользователе в currentUser
  // в массив зависимостей внесен token, состояние (изменение) которого отслеживает useEffect
  useEffect(() => {
    if (token) {
      api._token = localStorage.getItem("token")
      Promise.all([api.getProductList(), api.getUserInfo()]).then(
        ([productData, userData]) => {
          setCurrentUser(userData);
          setCards(productData.products.filter((product) => product.author._id === userData._id ));
          setIsLoading(false);
        }
      ).catch((error) => alert(error));
    }
  }, [token]);

  //запуск поиска по клику
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleRequest();
  };

  // асинхронная функция изменения состояние пользователя 
  async function handleUpdateUser(userUpdate) {
    try {
      //запрос к серверу
      await api.setUserInfo(userUpdate).then((newUserData) => {
        // удачный ответ от сервера => учстанавливаем новые данные пользователя
        setCurrentUser(newUserData);
      });
    } catch (error) {
      //вывод ошибке при неудачном ответе от сервера
      alert(error)
    }
  }
  //запуск поиска при вводе
  const handleInputChange = (inputValue) => {
    setSearchQuery(inputValue);
  };
  // асинхронная функция изменения состояние лайка 
  const handleProductLike = async (product) => {
    const isLiked = product.likes.some((id) => id === currentUser._id);
    try {
      const newCard = await api.changeLikeProductStatus(product._id, !isLiked);
      const newCards = cards.map((c) => {
        return c._id === newCard._id ? newCard : c;
      });
      setCards(newCards);
      return newCard;
    } catch (error) {
      alert(error)
    }

  };
  // сортировка товаров дешевые/дорогие/по скидке
  const onChangeSort = (id) => {
    setCurrentSort(id);
  };

  return (
    <>
    {/* устанавливаем переменные передаваемые через контекст пользователя */}
      <UserContext.Provider value={{ user: currentUser, isLoading, setIsVisible, isVisible }}>
        {/* устанавливаем переменные передаваемые через контекст товаров */}
      <CardContext.Provider value={{ cards, currentSort, onChangeSort, handleProductLike }}>
         {/* устанавливаем переменные передаваемые через контекст мобильного окна */}
        <ModalContext.Provider value={{ active, setActive, setToken }} >
          <Header user={currentUser} onUpdateUser={handleUpdateUser}>
            <>
              <Logo className="logo logo_place_header" href="/" />
              <Search onSubmit={handleFormSubmit} onInput={handleInputChange} />
            </>
          </Header>
          <main className="content container">
            <SearchInfo searchCount={cards.length} searchText={debounceValue} />
            {/* реализация маршрутизации */}
            <Routes>
              {/* переход по соответствующему роуты и открытие соответствующей страницы */}
              <Route
                index
                element={
                   // если api._token существует загружаем CatalogPage
                  api._token && <CatalogPage
                  />
                }
              />
              <Route
                path="/product/:productId"
                element={
                  // если api._token существует загружаем ProductPage
                  api._token && <ProductPage
                    isLoading={isLoading}
                    handleLike={handleProductLike}
                  />
                }
              />
              <Route
                path="/faq"
                element={
                  // если api._token существует загружаем FAQPage
                  api._token && <FAQPage
                  />
                }
              />
              <Route
                path="/user"
                element={
                  // если api._token существует загружаем UserPage
                  api._token && <UserPage setIsVisible={setIsVisible} onUpdateUser={handleUpdateUser}
                  />
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </ModalContext.Provider>
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
