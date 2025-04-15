// Añadir a useEffect en componente principal (opcional en Home o Layout)
useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !store.user) {
      fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
        headers: { Authorization: "Bearer " + token },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            dispatch({ type: "set_user", payload: data.user });
          }
        });
    }
  }, []);