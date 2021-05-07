import React from "react";

export const Waze = () => {
	return (
		<div className="text-center mh-100" style={{ height: "500px" }}>
			<iframe
				src="https://embed.waze.com/es/iframe?zoom=12&lat=9.748917&lon=-83.753428"
				width="800"
				height="700"
				frameBorder="0"
				style={{ border: "0" }}
				allowFullScreen
			/>
		</div>
	);
};
