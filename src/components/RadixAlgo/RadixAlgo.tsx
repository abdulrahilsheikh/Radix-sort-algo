import { useEffect, useState } from "react";
import { generateRandom, visualizeChange } from "../../utils/Algo";

type Props = {};
type VerticalBarType = {
	index: number;
	value: 0 | 1 | 2;
	min: number;
	max: number;
};
const barHeightTypes = {
	0: "h-20 bg-[#17A68C]",
	1: "h-24 bg-[#FF4C52]",
	2: "h-36 bg-[#0DC4D9]",
};
const space = 1.05;

const VerticalBar = ({ index, value, min, max }: VerticalBarType) => {
	const height = ((max - min + value) / max) * 3 + 5;
	return (
		<div
			id={`bar-${value}`}
			style={{
				left: `${5 * (index + 1) - 2}rem`,
				height: `${height}rem`,
			}}
			className={`transition-all w-14 rounded ${"h-20 bg-[#17A68C]"}  absolute bottom-4 flex items-center flex-col-reverse text-slate-200 `}>
			{value}
		</div>
	);
};

const RadixAlgo = ({}: Props) => {
	const [array, setArray] = useState(generateRandom());
	const [size, setSize] = useState(46);
	const [delay, setDelay] = useState(0.25);
	const [start, setStart] = useState(false);
	const [shuffled, setShuffled] = useState(false);
	const onSizeChangeHandler = (number: number) => {
		if (number > 46) {
			setSize(46);
		} else {
			setSize(number);
		}
	};
	const visualize = async () => {
		setStart(true);
		setShuffled(true);
		await visualizeChange(array, delay);
		setStart(false);
	};
	useEffect(() => {
		// setArray(generateRandom(size));
	}, [size]);
	const resetSort = () => {
		setStart(false);
		setShuffled(false);
		setArray(generateRandom());
	};
	return (
		<div className="flex   gap-4">
			<div className="flex gap-4 flex-col w-40 self-center">
				<button
					disabled={shuffled}
					onClick={() => {
						visualize();
					}}
					className={`flex-shrink-0 px-4 py-2 text-base font-semibold text-white  rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 ${
						shuffled
							? "bg-gray-500 hover:bg-gray-500"
							: "bg-purple-600 hover:bg-purple-700"
					} w-fit`}>
					Sort
				</button>
				<button
					disabled={start}
					onClick={resetSort}
					className={`flex-shrink-0 px-4 py-2 text-base font-semibold text-white  rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200 w-fit  ${
						start
							? "bg-gray-500 hover:bg-gray-500"
							: "bg-red-600 hover:bg-red-700"
					}`}>
					Re-shuffle
				</button>

				<span className="text-white">Radix Digit Index</span>
				<div
					className="text-white bg-[#292927] px-4 py-2 rounded"
					id="radix-index">
					0
				</div>
				<span className="text-white">Animation Time</span>
				<select
					value={delay}
					className="rounded-lg px-4 self-stretch py-2"
					onChange={(e) => setDelay(+e.target.value)}>
					<option value={0.25}>0.25s</option>
					<option value={0.5}>0.5s</option>
					<option value={1}>1s</option>
				</select>
			</div>
			<div className="flex flex-col gap-4" key={`${array}`}>
				<div className="flex bg-[#292927] h-12"></div>
				<div className="w-[51rem] bg-[#292927] h-60 relative p-4 flex">
					{array.map((value, idx) => (
						<div
							id={`bucket-${value}`}
							style={{
								left: `${5 * (idx + 1) - 2}rem`,
								top: `${-3}rem`,
							}}
							className="transition-all absolute w-14 rounded text-slate-100 h-6 bg-red-400 flex items-center justify-center   -translate-x-[50%]">
							{value}
						</div>
					))}
					<div className="flex w-full  gap-4 justify-start">
						{"*"
							.repeat(10)
							.split("")
							.map((_, idx) => (
								<div className="w-16  bg-[#252523] text-white flex  pb-2 items-end   justify-center rounded">
									{idx}
								</div>
							))}
					</div>
				</div>
				{/* bars */}
				<div
					key={`${size}${array}`}
					className="w-[51rem] bg-[#292927] h-52 relative p-4">
					{array.map((numb: any, idx) => (
						<VerticalBar
							min={Math.min(...array)}
							max={Math.max(...array)}
							index={idx}
							value={numb}
						/>
					))}
				</div>
				<div className="font-bold text-white border-b-4 border-b-[#292927]">
					Radix Sort Algorithm
				</div>
			</div>
			<div className="flex gap-4 items-center"></div>
		</div>
	);
};

export default RadixAlgo;
