import Supplier from "./Supplier"; // Asegúrate que la importación sea correcta

// NO definimos API_URL aquí

/**
 * Función asíncrona para obtener la lista de proveedores desde la API.
 * @returns {Promise<Supplier[]>} Una promesa que resuelve a un array de objetos Supplier.
 */
export async function searchSuppliers(): Promise<Supplier[]> {
  try {
    // USA RUTA RELATIVA:
    const response = await fetch('/api/suppliers', { // <-- CAMBIO AQUÍ
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa (código de estado 2xx).
    if (!response.ok) throw new Error("Error al obtener los proveedores"); // Corregido: proveedores

    // Parsea la respuesta JSON y la retorna.
    return await response.json();
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error(error);
    // Retorna un array vacío en caso de error para evitar que la aplicación falle.
    return [];
  }
}

/**
 * Función asíncrona para eliminar un proveedor por su ID.
 * @param {number} id El ID del proveedor a eliminar. // Asumiendo number
 * @returns {Promise<void>} Una promesa que resuelve cuando el proveedor ha sido eliminado.
 */
export async function removeSupplier(id: number): Promise<void> {
  try {
    // USA RUTA RELATIVA:
    const response = await fetch(`/api/suppliers/${id}`, { // <-- CAMBIO AQUÍ
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) throw new Error("Error al eliminar el proveedor");
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error(error);
  }
}

/**
 * Función asíncrona para guardar un nuevo proveedor o actualizar uno existente.
 * @param {Supplier} supplier El objeto Supplier a guardar.
 * @returns {Promise<void>} Una promesa que resuelve cuando el proveedor ha sido guardado.
 */
export async function saveSupplier(supplier: Supplier): Promise<void> {
  try {
    // USA RUTA RELATIVA:
    const response = await fetch('/api/suppliers', { // <-- CAMBIO AQUÍ
      method: "POST",
      body: JSON.stringify(supplier), // Convierte el objeto Supplier a JSON.
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) throw new Error("Error al guardar el proveedor");
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error(error);
  }
}

/**
 * Función asíncrona para obtener un proveedor por su ID.
 * @param {number} id El ID del proveedor a buscar.
 * @returns {Promise<Supplier | null>} Una promesa que resuelve al objeto Supplier o null si no se encuentra.
 */
export async function searchSupplierById(id: number): Promise<Supplier | null> {
  try {
    // USA RUTA RELATIVA:
    const response = await fetch(`/api/suppliers/${id}`, { // <-- CAMBIO AQUÍ
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) {
      // Maneja el caso específico de "no encontrado" (código de estado 404).
      if (response.status === 404) {
        // Corregido: Mensaje específico para proveedor
        console.warn(`Proveedor con ID ${id} no encontrado.`);
        // Retorna null en lugar de generar un error para indicar que el proveedor no existe.
        return null;
      }
      // Lanza un error genérico para otros códigos de estado no exitosos.
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Parsea la respuesta JSON y la retorna.
    return await response.json();
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error("Error al obtener el proveedor:", error);
    // Retorna null en caso de error para evitar que la aplicación falle.
    return null;
  }
}