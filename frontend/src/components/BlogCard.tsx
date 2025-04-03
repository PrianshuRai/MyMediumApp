import { Link } from "react-router-dom";

interface BlogCardProp {
	authorName: string;
	title: string;
	content: string;
	publishedDate: string;
	key: string;
}

export const BlogCard = ({
	authorName,
	title,
	content,
	publishedDate,
	key,
}: BlogCardProp) => {
	return (
		<div className="w-full max-w-2xl mx-auto">
			<Link to={`/blog`}>
				<div className="flex flex-col p-10 border-b border-slate-200 rounded-lg w-full">
					<div className="flex items-center">
						<span className="">
							<Avatar name={authorName} size={6}/>
						</span>
						<span className="px-2 text-sm">{authorName}</span>
						<div>
							<Circle />
						</div>
						<span className="px-2 font-thin text-sm text-slate-500">
							{publishedDate}
						</span>
					</div>
					<div className="text-xl font-semibold ">{title}</div>
					<div className="text-md font-thin">
						{content.length > 100
							? content.slice(0, 100) + "..."
							: content}
					</div>
					<div className="text-slate-400 text-sm font-thin pt-2">{`${Math.ceil(
						content.length / 100
					)} minute(s) read`}</div>
					<div className="h1 w-full text-slate bg-slate-200"></div>
				</div>
			</Link>
		</div>
	);
};

function Circle() {
	return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}

export function Avatar({ name, size }: { name: string, size: number }) {
	return (
		<div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
			<span className="font-xs text-gray-600 dark:text-gray-300">
				{name[0]}
			</span>
		</div>
	);
}
