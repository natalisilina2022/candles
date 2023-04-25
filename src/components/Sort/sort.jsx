import cn from "classnames";
import "./index.css";

const Sort = ({ tabs = [], onChangeSort, currentSort }) => {
	console.log(tabs);
	// при клике отсортировываем
	const handleClick = (e, tab) => {
		e.preventDefault();
		onChangeSort(tab.id)
	}

	return (
		// отрисовываем кнопки вариантов сортировки товаров
		// tabs варианты сортировки
		<div className="sort content__sort">
			{tabs.map(tab => (
				<div
					key={tab.id}
					id={tab.id}
				>
					<button className={cn("sort__link", {
						"sort__link_selected": currentSort === tab.id
					})} onClick={(e) => handleClick(e, tab)}>
						{tab.title}
					</button>
				</div>
			))}

		</div>
	);
};

export default Sort;