import Customer from "./Customer";

// NO definimos API_URL aquí

/**
 * Función asíncrona para obtener la lista de clientes desde la API.
 * @returns {Promise<Customer[]>} Una promesa que resuelve a un array de objetos Customer.
 */
export async function searchCustomers(): Promise<Customer[]> {
  try {
    // USA RUTA RELATIVA: El navegador completará con el dominio actual
    const response = await fetch('/api/customers', { // <-- CAMBIO AQUÍ
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error al obtener los clientes");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Función asíncrona para eliminar un cliente por su ID.
 * @param {number} id El ID del cliente a eliminar. // Corregido a number si tu API espera number
 * @returns {Promise<void>} Una promesa que resuelve cuando el cliente ha sido eliminado.
 */
export async function removeCustomer(id: number): Promise<void> {
  try {
    // USA RUTA RELATIVA:
    const response = await fetch(`/api/customers/${id}`, { // <-- CAMBIO AQUÍ
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error al eliminar el cliente");
  } catch (error) {
    console.error(error);
  }
}

/**
 * Función asíncrona para guardar un nuevo cliente o actualizar uno existente.
 * @param {Customer} customer El objeto Customer a guardar.
 * @returns {Promise<void>} Una promesa que resuelve cuando el cliente ha sido guardado.
 */
export async function saveCustomer(customer: Customer): Promise<void> {
  try {
    // USA RUTA RELATIVA:
    const response = await fetch('/api/customers', { // <-- CAMBIO AQUÍ
      method: "POST",
      body: JSON.stringify(customer),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error al guardar el cliente");
  } catch (error) {
    console.error(error);
  }
}

/**
 * Función asíncrona para obtener un cliente por su ID.
 * @param {number} id El ID del cliente a buscar.
 * @returns {Promise<Customer | null>} Una promesa que resuelve al objeto Customer o null si no se encuentra.
 */
export async function searchCustomerById(id: number): Promise<Customer | null> {
  try {
    // USA RUTA RELATIVA:
    const response = await fetch(`/api/customers/${id}`, { // <-- CAMBIO AQUÍ
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Cliente con ID ${id} no encontrado.`);
        return null;
      }
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    return null;
  }
}