const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		programs: [],
		totalHours: [],
		inputStatusMessage: "",
	  },
	  actions: {
		getProgram: async () => {
		  console.log("process.env.BACKEND_URL ", process.env.BACKEND_URL);
		  try {
			const resp = await fetch(process.env.BACKEND_URL + "/api/programs");
			const data = await resp.json();
			let sortedData = data.sort(
			  (a, b) => a.program_number - b.program_number
			);
			setStore({ programs: sortedData });
  
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		updateProgram: async (programData) => {
		  try {
			const resp = await fetch(
			  process.env.BACKEND_URL + "/api/updateProgram",
			  {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(programData),
			  }
			);
			const data = await resp.json();
			if (resp.status == 200) {
			  setStore({ inputStatusMessage: "Programs successfully updated!" });
			} else {
			  setStore({
				inputStatusMessage: "Programs not updated, please try again.",
			  });
			}
			setStore({ programs: data });
  
			return data;
		  } catch (error) {
			console.log("Error loading message from backend", error);
		  }
		},
		clearInputStatusMessage: () => {
		  setStore({ inputStatusMessage: "" });
		},
  
		addTotalHours: () => {
		  let totalHoursArray = [];
		  let store = getStore();
		  store.programs.forEach((program) => {
			let weekday = [
			  "monday",
			  "tuesday",
			  "wednesday",
			  "thursday",
			  "friday",
			  "saturday",
			  "sunday",
			];
			let programHours = { name: program.name };
  
			weekday.forEach((weekday) => {
			  const startTimeStr = program[`${weekday}_start`];
			  const endTimeStr = program[`${weekday}_end`];
  
			  // Parse the time strings into Date objects
			  const startTime = new Date(`01/01/2022 ${startTimeStr}`);
			  const endTime = new Date(`01/01/2022 ${endTimeStr}`);
  
			  // Calculate the difference between the start and end times in milliseconds
			  const timeDiff = endTime.getTime() - startTime.getTime();
  
			  // Convert the time difference from milliseconds to hours
			  const hoursDiff = timeDiff / (1000 * 60 * 60);
			  // const widthValue = hoursDiff * 100;
			  // Round the result to two decimal places
			  const totalHours = hoursDiff.toFixed(2);
  
			  programHours[`${weekday}_hours`] = totalHours;
			});
			totalHoursArray.push(programHours);
		  });
  
		  setStore({ totalHours: totalHoursArray });
		},
	  },
	};
  };
  
  export default getState;