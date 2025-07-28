export const initialStore = () => {
  return {
    message: null,
    contactForm: initialContactFormState,
    leads: [],
    leadsFetchStatus: {
      status: "idle",
      error: null,
    },
  };
};

const initialContactFormState = {
  status: "idle",
  error: null,
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "ADMIN_LOGIN_START":
      return {
        ...store,
        loginStatus: {
          status: "loading",
          error: null,
        },
      };

    case "ADMIN_LOGIN_SUCCESS":
      return {
        ...store,
        loginStatus: {
          status: "success",
          error: null,
        },
      };

    case "ADMIN_LOGIN_FAILURE":
      return {
        ...store,
        loginStatus: {
          status: "error",
          error: action.payload,
        },
      };

    case "GET_ALL_LEADS_START":
      return {
        ...store,
        leadsFetchStatus: {
          status: "loading",
          error: null,
        },
      };

    case "GET_ALL_LEADS_SUCCESS":
      return {
        ...store,
        leads: action.payload,
        leadsFetchStatus: {
          status: "success",
          error: null,
        },
      };

    case "GET_ALL_LEADS_FAILURE":
      return {
        ...store,
        leadsFetchStatus: {
          status: "error",
          error: action.payload,
        },
      };

    case "CONTACT_SUBMIT_START":
      return {
        ...store,
        contactForm: {
          ...store.contactForm,
          status: "loading",
          error: null,
        },
      };

    case "CONTACT_SUBMIT_SUCCESS":
      return {
        ...store,
        contactForm: {
          ...store.contactForm,
          status: "success",
        },
      };

    case "CONTACT_SUBMIT_FAILURE":
      return {
        ...store,
        contactForm: {
          ...store.contactForm,
          status: "error",
          error: action.payload,
        },
      };

    case "CONTACT_RESET_STATUS":
      // Resetea el estado del formulario a su valor inicial
      return {
        ...store,
        contactForm: initialContactFormState,
      };

    default:
      throw Error("Unknown action.");
      return store;
  }
}
