import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner/Spinner"
import { tabs } from "../../utils";

export const CatalogPage = () => {
    // используем переменные переданные через контекст
  const { cards, currentSort, onChangeSort, handleProductLike } = useContext(CardContext);
  const { user} = useContext(UserContext);
    return (
      <>
      <Sort
        currentSort={currentSort}
        onChangeSort={onChangeSort}
        tabs={tabs}
      />
      <div className="content__cards">
        {cards && cards.length > 0 ? (
          <CardList
            goods={cards}
            onProductLike={handleProductLike}
            currentUser={user}
            currentSort={currentSort}
          />
        ) : (
          <Spinner />
        )}
      </div>
    </>
    )
}