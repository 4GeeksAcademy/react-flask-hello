import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const UploadView = () => {
	const { store, actions } = useContext(Context);
	const [files, setFiles] = useState(null);

	const uploadFile = e => {
		e.preventDefault(); //stop website reload
		if (files) {
			//if there are any files to upload
			//call the action and pass the file
			actions.uploadFile(files[0]);
		}
	};

	return (
		<div className="container">
			<form onSubmit={e => uploadFile(e)}>
				<input type="file" onChange={e => setFiles(e.target.files)} />
				<button className="btn btn-primary">Upload</button>
			</form>
		</div>
	);
};
