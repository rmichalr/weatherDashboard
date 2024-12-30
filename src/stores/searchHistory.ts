import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchHistoryStore = defineStore("searchHistory", () => {
	const searches = ref<string[]>([]);
	const loadSearches = () => {
		const storedSearches = localStorage.getItem("searches");
		if (storedSearches) {
			searches.value = JSON.parse(storedSearches);
		}
	};
	loadSearches();

	const saveSearch = (search: any) => {
		searches.value.push(search);
		localStorage.setItem("searches", JSON.stringify(searches.value));
	};

	const addSearch = (search: any) => {
		saveSearch(search);
	};

	const clearSearches = () => {
		searches.value = [];
		localStorage.removeItem("searches");
	};

	return { searches, addSearch, clearSearches };
});
