import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import imgSize from "../../img/240x120.png";
import { ButtonAdmin } from "../component/buttonAdmin";

export const Components = () => {

	const component_category = [
		{
		  title: 'Alerts',
		  description: 'Different types of alerts', 
		  image: imgSize
		},
		{
		  title: 'Badges', 
		  description: 'Small count indicators',
		  image: imgSize
		},
		{
		  title: 'Breadcrumbs',
		  description: 'Indicates page location',
		  image: imgSize
		},
		{
		  title: 'Buttons',
		  description: 'Various button styles',
		  image: imgSize
		},
		{
		  title: 'Button Groups',
		  description: 'Grouped buttons',
		  image: imgSize
		},
		{
		  title: 'Cards',
		  description: 'Flexible content containers',
		  image: imgSize
		},
		{
		  title: 'Carousels',
		  description: 'Rotating content slides',
		  image: imgSize
		},
		{
		  title: 'Collapses',
		  description: 'Toggleable content sections',
		  image: imgSize
		},
		{
		  title: 'Dropdowns',
		  description: 'Toggleable menu buttons',
		  image: imgSize
		},
		{
		  title: 'List Groups', 
		  description: 'List element styles',
		  image: imgSize
		},
		{
		  title: 'Modals',
		  description: 'Overlay pop up windows',
		  image: imgSize
		},
		{
		  title: 'Navs & Navbars',
		  description: 'Navigation components',
		  image: imgSize
		},
		{
		  title: 'Pagination',
		  description: 'Page number indicators',
		  image: imgSize
		},
		{
		  title: 'Popovers',
		  description: 'Small overlay content',
		  image: imgSize
		},
		{
		  title: 'Progress Bars',
		  description: 'Progress indicators',
		  image: imgSize
		}
	]

	return (
		<div className="container">
			<p className="text-warning fw-bolder mt-5">/Components</p>
			<h2 className="fw-bolder" >Beautifully crafted UI components, ready for your next project.</h2>
			<p>Over 500+ professionally designed, fully responsive, expertly crafted component examples you can drop into your Tailwind projects and customize to your heart’s content.	</p>
			<p className="text-warning fw-bolder">Browse all components →</p>

			<ButtonAdmin/>

			<div class="row mt-5">
				{component_category.map((item) => (
					<div className="col-12 col-md-6 col-lg-3 mb-4">
						<div class="card h-100 mx-1 shadow">
							<img src={item.image} class="card-img-top" alt={item.title}/>
							<div class="card-body pt-2">
								<h5 class="card-title text-warning">{item.title}</h5>
								<p class="card-text text-muted">{item.description}</p>
							</div>
						</div>
					</div>
				))}
				
			</div>

		</div>
	);
};
