export const initialStore = () => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");
  const businessStr = localStorage.getItem("business");
  const selectedBusinessStr = localStorage.getItem("selected_business");
  const clientsStr = localStorage.getItem("clients");
  const selectedClientStr = localStorage.getItem("selectedClient");
  const clientNotesStr = localStorage.getItem("client_notes");

  let user = null;
  let business = [];
  let selectedBusiness = null;
  let clients = [];
  let selectedClient = null;
  let clientNotes = {};

  try {
    if (userStr) user = JSON.parse(userStr);
    if (businessStr) business = JSON.parse(businessStr);
    if (selectedBusinessStr) selectedBusiness = JSON.parse(selectedBusinessStr);
    if (clientsStr) {
      clients = JSON.parse(clientsStr);
      // Asegurarse de que clients sea siempre un array
      if (!Array.isArray(clients)) {
        console.warn(
          "clients en localStorage no es un array, inicializando como array vacío"
        );
        clients = [];
      }
    }
    if (selectedClientStr) selectedClient = JSON.parse(selectedClientStr);
    if (clientNotesStr) clientNotes = JSON.parse(clientNotesStr);
  } catch (e) {
    console.error("Error al parsear datos de localStorage:", e);
    // En caso de error, inicializar todo con valores seguros
    user = null;
    business = [];
    selectedBusiness = null;
    clients = [];
    selectedClient = null;
    clientNotes = {};
  }

  return {
    token: token || null,
    user: user || null,
    error: null,
    business: business || [],
    selectedBusiness: selectedBusiness || null,
    calendarEvents: [],
    calendarLoading: false,
    calendarError: null,
    syncStatus: null,
    clients: clients || [],
    selectedClient: selectedClient || null,
    clientNotes: clientNotes || {},
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "login":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
      };

    case "logout":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("business");
      localStorage.removeItem("selected_business");
      localStorage.removeItem("clients");
      localStorage.removeItem("selectedClient");
      localStorage.removeItem("client_notes");

      return {
        ...store,
        token: null,
        user: null,
        business: [],
        selectedBusiness: null,
        clients: [],
        clientNotes: {},
      };

    case "set_business":
      localStorage.setItem("business", JSON.stringify(action.payload));
      return {
        ...store,
        business: action.payload,
      };

    case "select_business":
      localStorage.setItem("selected_business", JSON.stringify(action.payload));
      return {
        ...store,
        selectedBusiness: action.payload,
      };

    case "load_calendar_events_start":
      return {
        ...store,
        calendarLoading: true,
        calendarError: null,
      };

    case "load_calendar_events_success":
      return {
        ...store,
        calendarEvents: action.payload,
        calendarLoading: false,
        calendarError: null,
      };

    case "load_calendar_event_error":
      return {
        ...store,
        calendarLoading: false,
        calendarError: action.payload,
      };

    case "sync_calendar_start":
      return {
        ...store,
        syncStatus: { loading: true, message: null, success: null },
      };

    case "sync_calendar_success":
      return {
        ...store,
        syncStatus: {
          loading: false,
          message: action.payload.msg,
          success: true,
          count: action.payload.synced_appointments.length,
        },
      };

    case "sync_calendar_error":
      return {
        ...store,
        syncStatus: {
          loading: false,
          message: action.payload,
          success: false,
        },
      };

    case "set_clients":
      // Asegurarse de que lo que guardamos en localStorage es un array
      const clientsToStore = Array.isArray(action.payload)
        ? action.payload
        : [];

      console.log("Saving clients in the reducer:", {
        cantidad: clientsToStore.length,
        esArray: Array.isArray(clientsToStore),
      });

      localStorage.setItem("clients", JSON.stringify(clientsToStore));

      return {
        ...store,
        clients: clientsToStore,
      };

    case "select_client":
      localStorage.setItem("selectedClient", JSON.stringify(action.payload));
      return {
        ...store,
        selectedClient: action.payload,
      };

    case "set_error":
      return {
        ...store,
        error: action.payload,
      };

    case "set_client_notes":
      const { clientId, notes } = action.payload;
      const updatedClientNotes = {
        ...store.clientNotes,
        [clientId]: notes,
      };

      localStorage.setItem("client_notes", JSON.stringify(updatedClientNotes));

      return {
        ...store,
        clientNotes: updatedClientNotes,
      };

    case "add_client_note":
      const { clientId: cId, note } = action.payload;
      const existingNotes = store.clientNotes[cId] || [];
      const notesWithNewNote = [note, ...existingNotes];

      const clientNotesWithNewNote = {
        ...store.clientNotes,
        [cId]: notesWithNewNote,
      };

      localStorage.setItem(
        "client_notes",
        JSON.stringify(clientNotesWithNewNote)
      );

      return {
        ...store,
        clientNotes: clientNotesWithNewNote,
      };

    case "delete_client_note":
      const { clientId: clId, noteId } = action.payload;

      if (!store.clientNotes[clId]) {
        return store;
      }

      const filteredNotes = store.clientNotes[clId].filter(
        (note) => note.id !== noteId
      );

      const clientNotesAfterDelete = {
        ...store.clientNotes,
        [clId]: filteredNotes,
      };

      localStorage.setItem(
        "client_notes",
        JSON.stringify(clientNotesAfterDelete)
      );

      return {
        ...store,
        clientNotes: clientNotesAfterDelete,
      };

    default:
      return store;
  }
}
