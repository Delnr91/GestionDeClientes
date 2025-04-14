import Employee from "./Employee";

// Define la URL base de la API, obteniéndola de las variables de entorno o usando un valor predeterminado.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/"; 

/**
 * Función asíncrona para obtener la lista de empleados desde la API.
 * @returns {Promise<Employee[]>} Una promesa que resuelve a un array de objetos Employee.
 */
export async function searchEmployees(): Promise<Employee[]> {
  try {
    // Realiza una petición GET a la API para obtener todos los empleados.
    const response = await fetch(`${API_URL}employees`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa (código de estado 2xx).
    if (!response.ok) throw new Error("Error al obtener los empleados");

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
 * Función asíncrona para eliminar un empleado por su ID.
 * @param {string} id El ID del empleado a eliminar.
 * @returns {Promise<void>} Una promesa que resuelve cuando el empleado ha sido eliminado.
 */
export async function removeEmployee(id: number): Promise<void> {
  try {
    // Realiza una petición DELETE a la API para eliminar el empleado con el ID especificado.
    const response = await fetch(`${API_URL}employees/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) throw new Error("Error al eliminar el empleado");
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error(error);
  }
}

/**
 * Función asíncrona para guardar un nuevo empleado o actualizar uno existente.
 * @param {Employee} employee El objeto Employee a guardar.
 * @returns {Promise<void>} Una promesa que resuelve cuando el empleado ha sido guardado.
 */
export async function saveEmployee(employee: Employee): Promise<void> {
  try {
    // Realiza una petición POST a la API para guardar el empleado.
    const response = await fetch(`${API_URL}employees`, {
      method: "POST",
      body: JSON.stringify(employee), // Convierte el objeto Employee a JSON.
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) throw new Error("Error al guardar el empleado");
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error(error);
  }
}

/**
 * Función asíncrona para obtener un empleado por su ID.
 * @param {number} id El ID del empleado a buscar.
 * @returns {Promise<Employee | null>} Una promesa que resuelve al objeto Employee o null si no se encuentra.
 */
export async function searchEmployeeById(id: number): Promise<Employee | null> {
  try {
    // Realiza una petición GET a la API para obtener el empleado con el ID especificado.
    const response = await fetch(`${API_URL}employees/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica si la respuesta de la API es exitosa.
    if (!response.ok) {
      // Maneja el caso específico de "no encontrado" (código de estado 404).
      if (response.status === 404) {
        console.warn(`Empleado con ID ${id} no encontrado.`);
        // Retorna null en lugar de generar un error para indicar que el empleado no existe.
        return null; 
      }
      // Lanza un error genérico para otros códigos de estado no exitosos.
      throw new Error(`Error HTTP: ${response.status}`);
    }

    // Parsea la respuesta JSON y la retorna.
    return await response.json();
  } catch (error) {
    // Captura y registra cualquier error que ocurra durante la petición.
    console.error("Error al obtener el empleado:", error);
    // Retorna null en caso de error para evitar que la aplicación falle.
    return null;
  }
}