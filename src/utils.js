function sortAsc(arr, key) {
	if (key) return arr.sort((a, b) => parseFloat(a[key] || -1) - parseFloat(b[key] || 0));
	return arr.sort((a, b) => a - b);
};

const _quantile = (sorted, q) => {
	const pos = (sorted.length - 1) * q;
	const base = Math.floor(pos);
	const rest = pos - base;
	if (sorted[base + 1] !== undefined) {
		return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
	} else {
		return sorted[base];
	}
};

function quantile(arr, q, key) {
	const sorted = sortAsc(arr, key);
	const sortOnlyValue = sorted.map(i => i[key]);
	const res = _quantile(sortOnlyValue, q);

	// findNearestindex
	let idxResult = 0;
	for (let index = 0; index < sorted.length; index++) {
		if (sorted[index][key] >= res) {
			idxResult = index;
			break;
		}
	}

	return sorted[idxResult];
};

module.exports = {
	sortAsc,
	quantile
}
