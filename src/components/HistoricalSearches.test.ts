import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import HistoricalSearches from "./HistoricalSearches.vue";
import { useSearchHistoryStore } from "../stores/searchHistory";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { createTestingPinia } from "@pinia/testing";

// Mock components and composables
vi.mock("./HistoricalSearchList.vue", () => ({
	default: {
		props: ["searches", "isCollapsed"],
		template: `
      <div class="historical-search-list">
        <template v-for="search in searches" :key="search">
          <div class="historical-search-item">{{ search }}</div>
        </template>
      </div>
    `,
	},
}));

vi.mock("../composables/useModalLock", () => ({
	useModalLock: () => ({
		lock: vi.fn(),
		unlock: vi.fn(),
	}),
}));

vi.mock("@vueuse/core", () => ({
	useConfirmDialog: () => ({
		isRevealed: false,
		reveal: () => Promise.resolve({ isCanceled: false }),
		confirm: vi.fn(),
		cancel: vi.fn(),
	}),
}));

describe("HistoricalSearches", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	// Factory function to create wrapper with given initial searches
	const createWrapper = async (initialSearches: string[] = []) => {
		const wrapper = mount(HistoricalSearches, {
			global: {
				plugins: [
					createTestingPinia({
						createSpy: vi.fn,
						initialState: {
							searchHistory: {
								searches: initialSearches,
							},
						},
					}),
				],
			},
		});

		await nextTick();
		return wrapper;
	};

	it("should render the historical searches list when there are searches", async () => {
		// Arrange
		const wrapper = await createWrapper(["search1", "search2"]);

		// Assert
		expect(wrapper.find(".historical-searches").exists()).toBe(true);
		expect(wrapper.findAll(".historical-search-item").length).toBe(2);
	});

	it("should not render the historical searches list when there are no searches", async () => {
		// Arrange
		const wrapper = await createWrapper([]);

		// Assert
		expect(wrapper.find(".historical-searches").exists()).toBe(false);
	});

	it('should clear the historical searches when the "Clear Data" link is clicked and confirmed', async () => {
		// Arrange
		const wrapper = await createWrapper(["search1", "search2"]);
		const store = useSearchHistoryStore();

		// Act
		await wrapper.find('[data-test="clear-data-link"]').trigger("click");

		// Assert
		expect(store.clearSearches).toHaveBeenCalled();
	});
});
