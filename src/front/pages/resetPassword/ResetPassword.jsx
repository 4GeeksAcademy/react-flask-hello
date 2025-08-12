export const ResetPassword = () =>{
    return(
        <div class="max-w-md mx-auto p-4 md:p-6 mt-20 mb-20 bg-white rounded shadow-md">
  <h2 class="text-2xl font-bold mb-4">Nueva contraseña</h2>
  <form>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Nueva contraseña
      </label>
      <input class="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Ingrese su nueva contraseña"/>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Guardar nueva contraseña
      </button>
    </div>
  </form>
</div>

    )
}