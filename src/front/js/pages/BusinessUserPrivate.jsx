import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import UpdateBusinessUserProfile from "../component/UpdateBusinessProfileUser.jsx"

const BusinessUserPrivate = () => {
  const { store, actions } = useContext(Context);
  const [businessName, setBusinessname] = useState(store.business_user?.business_name);
  const [email, setEmail] = useState(store.business_user?.email);
  const [nif, setNif] = useState(store.business_user?.nif);
  const [prefixTelephone, setPrefixTelephone] = useState(store.business_user?.phone_prefix);
  const [telephone, setTelephone] = useState(store.business_user?.phone_number);
  const [address, setAddress] = useState(store.business_user?.address);
  const [paymentMethod, setPaymentMethod] = useState(store.business_user?.payment_method);

  const [unsavedData, setUnsavedData] = useState({
    businessName: store.business_user?.business_name,
    email: store.business_user?.email,
    nif: store.business_user?.nif,
    phone_prefix: store.business_user?.phone_prefix,
    phone_number: store.business_user?.phone_number,
    address: store.business_user?.address,
    paymentMethod: store.business_user?.payment_method,
  });

  const handleChange = (field, value) => {
    setUnsavedData({
      ...unsavedData,
      [field]: value,
    });
  };

  const updateUser = async () => {
    try {
      const updateUser = await actions.updateBusinessUser(store.business_user.id, unsavedData);

      if (updateUser) {
        // console.log("User profile updated successfully");
        // Mettre à jour les états de base pour refléter les modifications sauvegardées       
        setBusinessname(unsavedData.businessName);
        setEmail(unsavedData.email);
        setNif(unsavedData.nif);
        setPrefixTelephone(unsavedData.phone_prefix);
        setTelephone(unsavedData.phone_number);
        setAddress(unsavedData.address);
        setPaymentMethod(unsavedData.paymentMethod);
      } else {
        // console.log("Failed to update user profile");
      }
    } catch (error) {
      // console.log("Error updating User private:", error);
    }
  };

  const handleCancelChanges = () => {
    // Rétablir les valeurs d'origine pour annuler les modifications
    setUnsavedData({
      businessName: store.business_user?.business_name,
      email: store.business_user?.email,
      nif: store.business_user?.nif,
      phone_prefix: store.business_user?.phone_prefix,
      phone_number: store.business_user?.phone_number,
      address: store.business_user?.address,
      paymentMethod: store.business_user?.payment_method,
    });
  };

  return (
    <div className='businessProfile-content container'>

      <UpdateBusinessUserProfile
        label="Nombre de la Empresa"
        value={unsavedData.businessName}
        onChange={(e) => handleChange("Nombre de la Empresa", e.target.value)}
      />

      <UpdateBusinessUserProfile
        label="Correo electrónico"
        value={unsavedData.email}
        onChange={(e) => handleChange("Correo electrónico", e.target.value)}
      />

      <UpdateBusinessUserProfile
        label="Nif"
        value={unsavedData.nif}
        onChange={(e) => handleChange("Nif", e.target.value)}
      />

      <UpdateBusinessUserProfile
        label="Prefijo telefónico"
        value={unsavedData.phone_prefix}
        onChange={(e) => handleChange("Prefijo telefónico", e.target.value)}
      />

      <UpdateBusinessUserProfile
        label="Número de teléfono"
        value={unsavedData.phone_number}
        onChange={(e) => handleChange("Número de teléfono", e.target.value)}
      />

      <UpdateBusinessUserProfile
        label="Dirección"
        value={unsavedData.address}
        onChange={(e) => handleChange("address", e.target.value)}
      />
      <UpdateBusinessUserProfile
        label="Método de pago"
        value={unsavedData.paymentMethod}
        onChange={(e) => handleChange("paymentMethod", e.target.value)}
      />

      <button onClick={() => updateUser()}>Guardar cambios</button>
      <button onClick={() => handleCancelChanges()}>Cancelar</button>
    </div>
  )
}

export default BusinessUserPrivate