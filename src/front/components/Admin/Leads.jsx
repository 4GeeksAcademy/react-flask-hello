
import { useEffect, useReducer } from "react";
import storeReducer, { initialStore } from "../../store";

const fetchAllLeads = async (dispatch) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    dispatch({ type: 'GET_ALL_LEADS_START' })
    try {
        const response = await fetch(`${apiUrl}/api/leads`)

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al obtener los leads");
        }
        const leadsData = await response.json();
        dispatch({ type: 'GET_ALL_LEADS_SUCCESS', payload: leadsData })
    } catch (error) {
        console.error("Error fetching leads:", error);
        dispatch({ type: 'GET_ALL_LEADS_FAILURE', payload: error.message })
    }
}

export const Leads = () => {
    const [store, dispatch] = useReducer(storeReducer, initialStore());

    useEffect(() => {
        fetchAllLeads(dispatch);
    }, [dispatch])

    const { leads, leadsFetchStatus } = store;

    if (leadsFetchStatus.status === 'loading') {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Cargando leads...</span>
                </div>
            </div>
        )
    }

    if (leadsFetchStatus.status === 'error') {
        return (
            <div className="alert alert-danger" role="alert">
                Error al cargar los leads: {leadsFetchStatus.error}
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {leads.length === 0 ? (
                        <p className="text-white">No se encontraron leads</p>
                    ) : (
                        <table class="table ">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Teléfono</th>
                                    <th scope="col">Proyecto</th>
                                    <th scope="col">Mensaje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leads.map((lead, index) => (
                                    <tr key={lead.id || index}>
                                        <th scope="row">{lead.id || index + 1}</th>
                                        <td>{lead.name}</td>
                                        <td>{lead.email}</td>
                                        <td>{lead.phone}</td>
                                        <td>{lead.company}</td>
                                        <td>{lead.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                    }
                </div>
            </div>
        </div>
    )
}