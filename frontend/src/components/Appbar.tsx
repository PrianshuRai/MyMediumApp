import { Avatar } from "./BlogCard";
import { Link, useLocation } from "react-router-dom";

export const Appbar = () => {
	const location = useLocation();

	return (
		<div className="border-b flex justify-between px-10 py-4 font-bold sticky top-0 backdrop-blur-md z-10">
			<Link to={"/blogs"}>
				<div className="font-bold text-xl">Medium</div>
			</Link>
			<div className="flex items-center">
				<div className="flex items-center">
					<Link
						to="/blogs"
						type="button"
						className="text-black hover:ring-4 hover:ring-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
					>
						Home
					</Link>
				</div>
				{location.pathname !== "/publish" ? (
					<div>
						<Link
							to="/publish"
							type="button"
							className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
						>
							Publish
						</Link>
					</div>
				) : null}
				<div>
					<Avatar name="Prianshu" size={8} />
				</div>
			</div>
		</div>
	);
};
