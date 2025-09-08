import { Maps } from "../components/maps/Maps"



export const Contact = () => {


    return (
        <div>
            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <div className="text-center py-16 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">CONTÁCTANOS</h1>
                    {/* Red underline */}
                    <div className="w-16 h-1 bg-red-600 mx-auto mb-8"></div>
                    
                </div>

                {/* SECCION CONTACTO */}
                <div className="flex flex-col lg:flex-row min-h-[500px]">
                   
                   
                    {/* Left Side - INFORMACION DEL CONTACTO*/}
                    <div className="lg:w-1/2 bg-gray-900 text-white p-8 lg:p-12">
                        <div className="max-w-md mx-auto lg:mx-0 space-y-12">
                            
                            {/* DIRECCION */}
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">DIRECCIÓN:</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                       Plaza ciudad de brujas
                                        <br />
                                        Valencia,46019
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">EMAIL:</h3>
                                    <p className="text-gray-300">
                                        <a href="mailto:hello@company.com" className="hover:text-white transition-colors">
                                            gamestoreproyect@gmail.com
                                        </a>
                                        <br />

                                    </p>
                                </div>
                            </div>

                            {/* Phone Section */}
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">LLÁMANOS:</h3>
                                    <p className="text-gray-300">
                                        <a href="tel:+12345678901" className="hover:text-white transition-colors">
                                            694 654 548
                                        </a>
                                        <br />

                                    </p>
                                </div>
                            </div>

                            {/* Contact Us Section */}
                            <div className="pt-8">
                                
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    Siguenos en redes sociales
                                </p>

                                {/* Social Media Icons */}
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="w-10 h-10 bg-transparent border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-800 transition-colors"
                                    >
                                        <span className="text-lg font-bold">f</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 bg-transparent border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-800 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 bg-transparent border border-white rounded-full flex items-center justify-center hover:bg-white hover:text-gray-800 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Map */}
                    <div className="lg:w-1/2 h-64 lg:h-auto">
                        <Maps />
                    </div>
                </div>
            </div>
        </div>
    )
}