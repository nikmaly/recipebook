export const arrayComparator = (array1: any[], array2: any[]) => {
	const comparisonReducer = (a: any[], b: any[]) => a.reduce(
		(totalMatch, currentItem) => (
			b.includes(currentItem) ? totalMatch : false
		),
		true,
	);

	const doArraysMatch = (
		comparisonReducer(array1, array2)
		&& comparisonReducer(array2, array1)
	);

	console.log('doArraysMatch: ', doArraysMatch);
	return doArraysMatch;
};
