import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKENDURL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
	const navigate = useNavigate();
	const [postInputs, setPostInputs] = useState({
		name: "",
		email: "",
		password: "",
	});

	async function sendRequest() {
		try {
			const response = await axios.post(
				`${BACKENDURL}/api/v1/user/${
					type === "signup" ? "signup" : "signin"
				}`,
				postInputs
			);
			console.log(`response: ${JSON.stringify(response)}`);
			const jwt = response.data.JWT_CODE;
			console.log(`jwt-->> ${jwt}`);
			localStorage.setItem("token", jwt);
			navigate("/blogs");
		} catch (error) {
			console.log(`error: ${error}`);
			alert(error);
		}
	}

	return (
		<div className="h-screen flex justify-center flex-col items-center">
			<div className="px-10 text-center">
				<div className="text-3xl font-extrabold">Create an account</div>
				<div className="text-slate-400">
					{type === "signin"
						? "Don't have an account?"
						: "Already have an account?"}
					<Link
						className="pl-2 underline"
						to={type === "signin" ? "/signup" : "/signin"}
					>
						{type === "signin" ? "Sign up" : "Sign in"}
					</Link>
				</div>
			</div>
			<div className="w-2/5 gap-4">
				{type === "signup" && (
					<LabeledInput
						label="Name"
						placeholder="Prianshu"
						onChange={(e) => {
							setPostInputs({
								...postInputs,
								name: e.target.value,
							});
						}}
					/>
				)}
				<LabeledInput
					label="Username"
					type="email"
					placeholder="PxR"
					onChange={(e) => {
						setPostInputs({
							...postInputs,
							email: e.target.value,
						});
					}}
				/>
				<LabeledInput
					label="Password"
					type="password"
					placeholder="12345@abc"
					onChange={(e) => {
						setPostInputs({
							...postInputs,
							password: e.target.value,
						});
					}}
				/>

				<button
					type="button"
					onClick={sendRequest}
					className="text-white bg-gray-700 w-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm mt-10 py-2.5"
				>
					{type === "signin" ? "Signin" : "Signup"}
				</button>
			</div>
		</div>
	);
};

interface LabeledInputType {
	label: string;
	type?: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabeledInput({
	label,
	type,
	placeholder,
	onChange,
}: LabeledInputType) {
	return (
		<div className="pt-4">
			<label className="block mb-2 text-sm font-semibold text-gray-900 ">
				{label}
			</label>
			<input
				onChange={onChange}
				type={type || "text"}
				id="first_name"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				placeholder={placeholder}
				required
			/>
		</div>
	);
}
