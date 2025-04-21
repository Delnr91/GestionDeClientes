import Employee from "./Employee";

// NO definimos API_URL aquí

/**
 * Función asíncrona para obtener la lista de empleados desde la API.
 * @returns {Promise<Employee[]>} Una promesa que resuelve a un array de objetos Employee.
 */
export async function searchEmployees(): Promise<Employee[]> {
  try {
    // USA RUTA RELATIVA:
    const response = await fetch('/api/employees', { // <-- CAMBIO AQUÍ
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error al obtener los empleados");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Función asíncrona para eliminar un empleado por su ID.
 * @param {number} id El ID del empleado a eliminar. // Asumiendo number como en Customer
 * @returns {Promise<void>} Una promesa que resuelve cuando el empleado ha sido eliminado.
 */
export async function removeEmployee(id: number): Promise<void> {
  try {
    // USA RUTA RELATIVA:
    const response = await fetch(`/api/employees/${id}`, { // <-- CAMBIO AQUÍ
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error al eliminar el empleado");
  } catch (error) {
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
    // USA RUTA RELATIVA:
    const response = await fetch('/api/employees', { // <-- CAMBIO AQUÍ
      method: "POST",
      body: JSON.stringify(employee),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error al guardar el empleado");
  } catch (error) {
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
    // USA RUTA RELATIVA:
    const response = await fetch(`/api/employees/${id}`, { // <-- CAMBIO AQUÍ
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Empleado con ID ${id} no encontrado.`);
        return null;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener el empleado:", error);
    return null;
  }
}