// import React, { useState } from "react";

// const UpdateProfileUser = ({ label, value, onChange, isEditingAll }) => { // Ajoutez la prop isEditingAll
//   const [isEditing, setIsEditing] = useState(false);
//   const [fieldValue, setFieldValue] = useState(value);

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = () => {
//     setIsEditing(false);
//     onChange(fieldValue);
//   };

//   const handleChange = (e) => {
//     setFieldValue(e.target.value);
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//     setFieldValue(value);
//   };

//   return (
//     <div>
//       <label>{label}:</label>
//       {isEditing || isEditingAll ? (
//         <div>
//           <textarea value={fieldValue} onChange={handleChange} />
//           <button onClick={handleSaveClick}>Guardar</button>
//           <button onClick={handleCancelClick}>Cancelar</button>
//         </div>
//       ) : (
//         <div>
//           <p>{value}</p>
//           <button onClick={handleEditClick}>Modificar</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateProfileUser;
