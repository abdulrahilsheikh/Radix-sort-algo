const delayPromis = (delay: number) =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve("yo");
		}, delay * 1000);
	});

function digitCount(num: number) {
	if (num === 0) return 1;
	return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function getDigit(num: number, place: number) {
	return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}
function mostDigits(nums: number[]) {
	let maxDigits = 0;
	for (let i = 0; i < nums.length; i++) {
		maxDigits = Math.max(maxDigits, digitCount(nums[i]));
	}
	return maxDigits;
}

export const generateRandom = () => {
	const tempSize: any = [10, 100, 1000, 1000, 10000];
	const temp: number[] = [];
	// for (let i = 0; i < 7; i++) {}
	const numberSet = new Set();
	while (temp.length < 8) {
		const number = Math.ceil(
			Math.random() *
				tempSize[Math.floor(Math.random() * tempSize.length)]
		);
		if (!numberSet.has(number)) {
			numberSet.add(number);
			temp.push(number);
		}
	}
	return temp;
};

export const visualizeChange = async (arrOfNums: number[], delay: number) => {
	const maxDigitCount = mostDigits(arrOfNums);

	for (let k = 0; k < maxDigitCount; k++) {
		const index = document.getElementById("radix-index");
		index!.innerHTML = `${k + 1}`;
		const digitBuckets: any[] = Array.from({ length: 10 }, () => []);
		for (let i = 0; i < arrOfNums.length; i++) {
			const digit = getDigit(arrOfNums[i], k);
			const doc = document.getElementById(`bucket-${arrOfNums[i]}`);
			doc!.style.left = `${5 * (digit + 1) - 2}rem`;
			doc!.style.top = "unset";
			doc!.style.bottom = `${3 + digitBuckets[digit].length * 1.75}rem`;
			await delayPromis(delay);
			digitBuckets[digit].push(arrOfNums[i]);
		}

		arrOfNums = [].concat(...digitBuckets);
		arrOfNums.forEach((value, idx) => {
			const doc = document.getElementById(`bar-${value}`);
			doc!.style.left = `${5 * (idx + 1) - 2}rem`;
		});
		await delayPromis(delay);
	}
	return arrOfNums;
};
