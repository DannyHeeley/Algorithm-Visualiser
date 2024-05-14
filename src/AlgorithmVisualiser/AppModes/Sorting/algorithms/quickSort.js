export async function quickSort(list, setAppState) {
	async function partition(low, high) {
		let pivot = list[high];
		let i = low - 1;
		for (let j = low; j < high; j++) {
			if (list[j] < pivot) {
				i++;
				[list[i], list[j]] = [list[j], list[i]];
				// Update app state
				await new Promise((resolve) => setTimeout(resolve, 50));
				setAppState((prevState) => ({
					...prevState,
					sortingValues: [...list],
				}));
			}
		}
		[list[i + 1], list[high]] = [list[high], list[i + 1]];
		// Update app state
		await new Promise((resolve) => setTimeout(resolve, 100));
		setAppState((prevState) => ({
			...prevState,
			sortingValues: [...list],
		}));
		return i + 1;
	}

	async function sort(low, high) {
		if (low < high) {
			let pi = await partition(low, high);
			await sort(low, pi - 1);
			await sort(pi + 1, high);
		}
	}

	await sort(0, list.length - 1);
}
