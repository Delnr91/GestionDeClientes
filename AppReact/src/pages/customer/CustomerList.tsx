import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { add, close, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Customer from "./Customer";
import { removeCustomer, searchCustomers } from "./CustomerApi";


/**
 * Componente para mostrar la lista de clientes.
 */
const CustomerList: React.FC = () => {
  // Obtiene el nombre del parámetro de la URL.
  const { name } = useParams<{ name: string }>();
  // Estado para almacenar la lista de clientes.
  const [clientes, setClientes] = useState<Customer[]>([]);
  // Hook para manejar la navegación entre rutas.
  const history = useHistory();

  /**
   * Efecto secundario que se ejecuta al montar el componente y cada vez que cambia la ruta.
   * Carga la lista de clientes desde la API.
   */
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Llama a la API para obtener la lista de clientes.
        const result = await searchCustomers();
        // Actualiza el estado con la lista de clientes obtenida.
        setClientes(result);
      } catch (error) {
        // Maneja cualquier error que ocurra durante la carga de clientes.
        console.error("Error al cargar clientes:", error);
      }
    };

    // Llama a la función para cargar los clientes.
    fetchCustomers();
    // Se ejecuta cada vez que cambia la ruta (history.location.pathname).
  }, [history.location.pathname]);

  /**
   * Función asíncrona para eliminar un cliente por su ID.
   * Actualiza la lista de clientes después de la eliminación sin hacer otra llamada a la API.
   * @param {string} id El ID del cliente a eliminar.
   */
  const remove = async (id: string) => {
    try {
      // Llama a la API para eliminar el cliente.
      await removeCustomer(Number(id));
      // Actualiza el estado filtrando la lista de clientes para excluir el cliente eliminado.
      setClientes(clientes.filter((cliente) => cliente.id !== Number(id)));
    } catch (error) {
      // Maneja cualquier error que ocurra durante la eliminación.
      console.error("Error al eliminar cliente:", error);
    }
  };

  /**
   * Función para navegar a la página de agregar un nuevo cliente.
   */
  const addCustomer = () => {
    // Navega a la ruta para agregar un nuevo cliente.
    history.push("/page/customer/new");
  };

  /**
   * Función para navegar a la página de edición de un cliente.
   * @param {string} id El ID del cliente a editar.
   */
  const editCustomer = (id: string) => {
    // Navega a la ruta para editar el cliente con el ID especificado.
    history.push(`/page/customer/${id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/*Contenido empleados - ion grid (basic usage)*/}

        <IonCard>
          <IonTitle>Gestión de Clientes</IonTitle>

          <IonItem>
            <IonButton
              onClick={addCustomer}
              color="primary"
              fill="solid"
              slot="end"
              size="default"
            >
              <IonIcon icon={add} />
              Agregar Cliente
            </IonButton>
          </IonItem>

          {/* Tabla de clientes */}

          <IonGrid className="table">
            <IonRow>
              <IonCol><strong>Nombre</strong></IonCol>
              <IonCol><strong>Email</strong></IonCol>
              <IonCol><strong>Teléfono</strong></IonCol>
              <IonCol><strong>Dirección</strong></IonCol>
              <IonCol><strong>Acciones</strong></IonCol>
            </IonRow>

            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <IonRow key={cliente.id}>
                  <IonCol>{cliente.firstname} {cliente.lastname}</IonCol>
                  <IonCol>{cliente.email}</IonCol>
                  <IonCol>{cliente.phone}</IonCol>
                  <IonCol>{cliente.address}</IonCol>
                  <IonCol>

                    {/* Botones de acción para editar y eliminar */}

                    <IonButton color="primary" fill="clear" onClick={() => editCustomer(String(cliente.id))}>
                      <IonIcon icon={pencil} slot="icon-only" />
                    </IonButton>
                    <IonButton color="danger" fill="clear" onClick={() => remove(String(cliente.id))}>
                      <IonIcon icon={close} slot="icon-only" />
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))
            ) : (

              // Se muestra un mensaje si no hay clientes registrados.  
              <IonRow>
                <IonCol size="12" className="ion-text-center">
                  No hay clientes registrados.
                </IonCol>
              </IonRow>
            )}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;