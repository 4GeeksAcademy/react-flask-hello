


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GenerateQr.css";

export default function QRGenerator() {
    const [inputValue, setInputValue] = useState("");
    const [qrUrl, setQrUrl] = useState("");
    const [error, setError] = useState("");

    const generateQR = () => {
        const trimmed = inputValue.trim();

        if (!trimmed) {
            setError("⚠️ Por favor ingresa una URL o texto");
            setQrUrl("");
            return;
        }

        setError("");

        const processed = processInput(trimmed);
        const encoded = encodeURIComponent(processed);
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}&format=png&margin=10&t=${Date.now()}`;

        setQrUrl(url);
    };

    const processInput = (rawInput) => {
        if (
            !rawInput.startsWith("http://") &&
            !rawInput.startsWith("https://") &&
            !rawInput.startsWith("mailto:") &&
            !rawInput.startsWith("tel:")
        ) {
            return "https://" + rawInput;
        }
        return rawInput;
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(qrUrl);
            if (!response.ok) throw new Error("Error en la red");
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = "codigoQR.png";
            a.click();

            setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
        } catch (error) {
            console.error(error);
            setError("❌ Error al generar el QR. Intenta nuevamente.");
        }
    };

    return (

        <>

            <section className="container py-5" id="qr" >
                <div className="row align-items-center">
                    {/* Columna Izquierda - Texto */}
                    <div className="col-lg-6">
                        {/* Etiqueta destacada */}
                        <span className="badge bg-danger bg-opacity-10 text-danger mb-3 fw-semibold fs-6">
                            <i className="bi bi-lightning-charge-fill me-1"></i>
                            Tecnología de vanguardia
                        </span>

                        {/* Título */}
                        <h2 className="mb-3">
                            Generador QR para tu tienda
                        </h2>

                        {/* Descripción */}
                        <p className="mb-4">
                            Genera QR para subir un nivel tu experiencia. Comparte tus productos en 5 segundos.
                        </p>

                        {/* Bloques de beneficios */}
                        <div className="mb-3 p-3 rounded-3 d-flex align-items-start bg-gradient-danger">
                            <div className="me-3 text-danger fs-1">🗹</div>
                           

                            <div>
                                <h5 className="mb-1">Compartir instantaneamente.</h5>
                                <p className="mb-0 small">
                                    Puedes compartir tus nuevos productos cuando quieras.
                                </p>
                            </div>
                        </div>


                        <div className="mb-3 p-3 rounded-3 d-flex align-items-start bg-gradient-danger">
                            <div className="me-3 text-danger fs-1">🗹</div>
                            <div>
                                <h5 className="mb-1">Fácil creación</h5>
                                <p className="mb-0 small">
                                    Crea productos facilmente.
                                </p>
                            </div>
                        </div>

                        <div className="mb-3 p-3 rounded-3 d-flex align-items-start bg-gradient-danger">
                            
                            <div className="me-3 fs-1 text-danger">🗹</div>
                           
                            <div>
                                <h5 className="mb-1 fw-semibold">Customizable</h5>
                                <p className="mb-0 small">
                                    Crea un código QR para tu tienda.
                                </p>
                            </div>
                        </div>

                       
                        
                    </div>

                    {/* Columna Derecha - Imagen */}
                    <div className="col-lg-6 text-center mt-5 mt-lg-0">
                        <img
                            src="https://media.istockphoto.com/id/1428709516/es/foto/compras-en-l%C3%ADnea-mujer-mano-compras-en-l%C3%ADnea-en-computadora-port%C3%A1til-con-diagrama-de-icono.jpg?s=612x612&w=0&k=20&c=dvNg1n36Q0DHE87RB_XhlbLXuo1iNWDjiMX_mCfWQHI="
                            alt="QR Code Generator Illustration"
                            className="img-fluid rounded-4 shadow-lg"
                        />
                    </div>
                </div>
            </section>

            <div className="container my-5">
                <div className="card shadow-lg p-4 border-0">
                    <div className="card-body text-center">
                        <h2 className="fw-bold mb-4 text-danger">Generador de Código QR</h2>

                        <div className="mb-3">
                            <input
                                className="form-control form-control-lg text-center"
                                type="text"
                                placeholder="Ingresa una URL, texto, correo o número"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>

                        <button
                            className="btn btn-danger btn-lg w-auto px-5 py-3 fs-3"
                            onClick={generateQR}
                        >
                            Generar QR
                            
                        </button>

                        {error && <p className="text-danger mt-3">{error}</p>}

                        {qrUrl && (
                            <div className="mt-4">
                                <div className="d-flex justify-content-center mb-3">
                                    <img
                                        src={qrUrl}
                                        alt="Código QR generado"
                                        className="border border-3 border-danger rounded p-2"
                                        width={300}
                                        height={300}
                                    />
                                </div>
                                <button
                                    className="btn btn-danger btn-lg"
                                    onClick={handleDownload}
                                >
                                    Descargar QR
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

