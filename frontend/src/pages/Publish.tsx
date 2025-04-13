import { Appbar } from "../components/Appbar";

export function Publish() {
	return (
		<>
			<Appbar />
			<div className="max-w-full p-4">
				<div className="flex flex-col items-center w-full">
					<div className="flex w-2/3 pl-8">
						<div className="flex">
							<div>
								<div className="text-6xl text-zinc-400 border-2 rounded-full w-16 h-16 flex items-center justify-center pb-1.5">
									+
								</div>
							</div>
							<div className="text-6xl text-zinc-400 mx-4 w-1 h-16 bg-zinc-200"></div>
						</div>
						<div>
							<div className="flex flex-col">
								<textarea
									name="content"
									id="content"
									placeholder="Content"
									className="w-full h-auto text-6xl text-zinc-400 outline-none px-4"
								></textarea>
								<textarea
									name="content"
									id="content"
									placeholder="Content"
									className="w-full h-[55dvh] text-4xl text-zinc-400 outline-none px-4"
								></textarea>
							</div>
							<div className="flex flex-row-reverse pt-4">
								<button
									type="button"
									className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2"
								>
									Save
								</button>
								<button
									type="button"
									className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
								>
									Clear
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
