const URL_BASE = "https://datosabiertos.navarra.es/datastore/dump/f1fc5b52-be72-4088-8cb1-772076e2071c?format=json&bom=True"

const getData = async () => {
    const response = await fetch(`${URL_BASE}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.log('error: ', response.status, response.statusText);
        return {error: {status: response.status, statusText: response.statusText}};
    };
};