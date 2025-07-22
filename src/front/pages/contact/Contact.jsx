export const Contact = () => {
    return (
        <section class="bg-blue-800 dark:bg-gray-900 text-white border-black">
            <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 class="mb-6 text-4xl tracking-tight font-extrabold text-center text-white dark:text-white">Contact</h2>
                <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback ? Let us know.</p>
                <form action="#" class="bg-orange-400 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
                    <div className="mt-3">
                        <label for="email" class="block mb-2 text-sm font-medium text-black dark:text-gray-300">email</label>
                        <input type="email" id="email" class="block p-3 w-full text-sm text-black bg-gray-50 rounded-lg border border-black shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mt-3">
                        <label for="subject" class="block mb-2 text-sm font-medium text-black dark:text-gray-300">Subject</label>
                        <input type="text" id="subject" class="block p-3 w-full text-sm text-white bg-gray-50 rounded-lg border border-black shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                    </div>
                    <div class="sm:col-span-2 mb-3">
                        <label for="message" class="block mb-2 text-sm font-medium text-black dark:text-gray-400">Your message</label>
                        <textarea id="message" rows="6" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-black focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                    </div>

                    <div class="flex justify-center">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                           Enviar
                        </button>
                    </div>


                </form>
            </div>
        </section>
    )
}