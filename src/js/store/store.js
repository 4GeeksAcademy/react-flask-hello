const getState = scope => {
	return {
		store: {
			posts: [
				{
					title: "This is a World Post",
					content:
						'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
					date: "Oct 15",
					tags: ["World"],
					author: "Denise A",
					image:
						"https://venturebeat.com/wp-content/uploads/2015/09/Screen-Shot-2015-09-03-at-13.43.14-e1441259794560.png",
					thumbnail:
						"https://media.takealot.com/covers_tsins/50045787/50045787-1-listgrid.jpg"
				},
				{
					title: "This is a Design Post",
					content:
						'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
					date: "Nov 4",
					tags: ["Design"],
					author: "Guy B",
					image:
						"https://i.pinimg.com/236x/1d/31/bc/1d31bc8e1e2647e73068f89937151bdd--graphic-design-posters-design-trends.jpghttps://i.pinimg.com/236x/1d/31/bc/1d31bc8e1e2647e73068f89937151bdd--graphic-design-posters-design-trends.jpg",
					thumbnail:
						"https://3.imimg.com/data3/CD/EL/MY-4359573/geographical-world-globe-250x250.jpg"
				},
				{
					title: "This is a Coding Post",
					content:
						'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
					date: "Jan 30",
					tags: ["Code"],
					author: "Mr. Robot",
					image:
						"https://cdn-images-1.medium.com/max/1081/1*fLC9_LpA53j2t_UUumTEVA.jpeg",
					thumbnail:
						"https://www.technipixel.com/products/Technipixel_products-04.jpg"
				},
				{
					title: "AI is Now Capable of Building Computers",
					content:
						"An AI takeover is a hypothetical scenario in which artificial intelligence (AI) becomes the dominant form of intelligence on Earth,with computers or robots effectively taking control of the planet away from the human species.Possible scenarios include replacement of the entire human workforce, takeover by a super intelligent AI.",
					date: "Oct 31",
					tags: ["Tech"],
					author: "O. Canner",
					image:
						"https://images.pexels.com/photos/39349/teens-robot-future-science-39349.jpeg?auto=compress&cs=tinysrgb&h=400&w=900",
					thumbnail:
						"https://images.pexels.com/photos/595804/pexels-photo-595804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=350"
				},
				{
					title:
						"Doctors Say Carpel Tunnel is Leading Cause of Depression",
					content:
						"Some say do not be worried about carpel tunnel, But if you have carpal tunnel syndrome, the pain, numbness, and tingling in your fingers get your attention. Treatments like wrist braces and corticosteroids can help, but in more severe cases, you may need surgery.",
					date: "Nov 27",
					tags: ["Health"],
					author: "Hand Hurtson",
					image:
						"https://images.pexels.com/photos/87584/pexels-photo-87584.jpeg?auto=compress&cs=tinysrgb&h=400&w=900",
					thumbnail:
						"https://images.pexels.com/photos/948888/pexels-photo-948888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=250"
				},
				{
					title: "Sitting is the New Smoking",
					content:
						"Sitting is a default human body posture, and when people work, socialize, study or travel, they often do so in a seated position. It is second nature.However, that does not mean sitting is harmless. It is like eating -- necessary, yet incredibly harmful if you do too much of it.",
					date: "May 30",
					tags: ["Health"],
					author: "Stan Seatly",
					image:
						"https://images.pexels.com/photos/846747/pexels-photo-846747.jpeg?auto=compress&cs=tinysrgb&h=350",
					thumbnail:
						"https://images.pexels.com/photos/840996/pexels-photo-840996.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=200&w=250"
				}
			],

			products: [
				{
					name: "Vintage Phone",
					image:
						"https://images.pexels.com/photos/9165/hand-top-white-old.jpg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 300.67,
					description: "Embrace nostagia with a brand new flip phone"
				},
				{
					name: "Vintage Macbook",
					image:
						"https://images.pexels.com/photos/958164/pexels-photo-958164.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 700.99,
					description:
						"The best way to type up your resume to show that you do not need modern day technology"
				},
				{
					name: "Car of You Dreams",
					image:
						"https://images.pexels.com/photos/459647/pexels-photo-459647.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 24000.25,
					description:
						"This car runs on diesel and has a brand new engine"
				},
				{
					name: "Leica Camera",
					image:
						"https://images.pexels.com/photos/1002635/pexels-photo-1002635.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 150.99,
					description:
						"Take better photos than an iPhone with this modern camera"
				},
				{
					name: "Crosley Record Player",
					image:
						"https://images.pexels.com/photos/6760/light-vintage-plant-morning.jpg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 99.99,
					description: "This will be a hit at your next party"
				},
				{
					name: "Modern Mapquest",
					image:
						"https://images.pexels.com/photos/697662/pexels-photo-697662.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 75.25,
					description: "Find your way around. You do not need Waze"
				},
				{
					name: "Polaroid Camera",
					image:
						"https://images.pexels.com/photos/191160/pexels-photo-191160.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 129.99,
					description: "Get instant photos"
				},
				{
					name: "Modern Motorcycle",
					image:
						"https://images.pexels.com/photos/819805/pexels-photo-819805.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 3500.5,
					description: "This is a speed demon. New oil just added."
				},
				{
					name: "Smart TV",
					image:
						"https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 250.99,
					description: "Fully functional without Netflix"
				}
			],

			session: {
				username: "Rigo",
				email: "rigocodes@gmail.com",
				loggedIn: false
			},

			cart: [
				{
					name: "Polaroid Camera",
					image:
						"https://images.pexels.com/photos/191160/pexels-photo-191160.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 129.99,
					description: "Get instant photos"
				},
				{
					name: "Smart TV",
					image:
						"https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 250.99,
					description: "Fully functional without Netflix"
				},
				{
					name: "Crosley Record Player",
					image:
						"https://images.pexels.com/photos/6760/light-vintage-plant-morning.jpg?auto=compress&cs=tinysrgb&h=500&w=500",
					price: 99.99,
					description: "This will be a hit at your next party"
				}
			]
		},
		actions: {
			addProductToCart: product => {
				let store = scope.state.store;
				store.cart.push(product);
				scope.setState({ store });
			},
			isLegalUser: user => {
				let store = scope.state.store;
				if (
					user.username === store.session.username &&
					user.email === store.session.email
				) {
					store.session.loggedIn = true;
					scope.setState({ store });
					return true;
				}
			}
		}
	};
};

export default getState;
