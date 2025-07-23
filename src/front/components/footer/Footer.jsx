
import './footer.css'


export const Footer = () => (
	

<footer class="bg-gray-800 rounded-lg shadow-sm dark:bg-gray-900">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-around">
            <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>

             <ul class="m-0 flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/AboutUs" class="hover:underline me-4 md:me-6 mr-8">About</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6 mr-8">Privacy Policy</a>
                </li>
                </ul>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/AboutUs" class="hover:underline me-4 md:me-6 mr-8">About</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6 mr-8">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline me-4 md:me-6 mr-8">Licensing</a>
                </li>
                <li>
                   
                    <a href="/Contact" class="hover:underline mr-8">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.</span>
    </div>
</footer>





);
