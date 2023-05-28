export const objectDeepCopy = (sourceObject: any) => {
	const stringifiedObject = JSON.stringify(sourceObject);
	const copiedObject = JSON.parse(stringifiedObject);

	return copiedObject;
};
