import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { checkmark } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import Customer from "./Customer";
import { saveCustomer, searchCustomerById } from "./CustomerApi";


/**
 * Componente para editar o agregar un cliente.
 */
const CustomerEdit: React.FC = () => {
  // Obtiene el nombre del parámetro de la URL.
  const { name } = useParams<{ name: string }>();
  // Estado para almacenar el objeto Customer que se está editando o creando.
  const [customer, setCustomer] = useState<Customer>({} as Customer);
  // Hook para manejar la navegación entre rutas.
  const history = useHistory();
  // Hook para obtener información sobre la ruta actual.
  const routeMatch = useRouteMatch<{ id: string }>("/page/customer/:id");
  // Obtiene el ID del cliente de la ruta. Si es "new", se está creando un nuevo cliente.
  const id = routeMatch?.params?.id;

  /**
   * Efecto secundario que se ejecuta cuando el ID cambia.
   * Llama a la función search para cargar los datos del cliente.
   */
  useEffect(() => {
    search();
  }, [id]);

  /**
   * Función asíncrona para buscar y cargar los datos del cliente.
   * Si el ID es "new", inicializa el estado con un objeto Customer vacío.
   * Si el ID es un número, llama a la API para obtener el cliente por su ID.
   */
  const search = async () => {
    if (id === "new") {
      setCustomer({} as Customer);
    } else {
      try {
        // Convierte el ID a número y llama a la API para obtener el cliente.
        const result = await searchCustomerById(Number(id) || 0);
        // Si se encuentra el cliente, actualiza el estado.
        if (result) setCustomer(result);
      } catch (error) {
        // Maneja cualquier error que ocurra durante la búsqueda.
        console.error("Error al cargar cliente:", error);
      }
    }
  };

  /**
   * Función asíncrona para guardar los datos del cliente.
   * Llama a la API para guardar el cliente y luego navega a la lista de clientes.
   */
  const save = async () => {
    try {
      // Llama a la API para guardar el cliente.
      await saveCustomer(customer);
      // Navega a la lista de clientes.
      history.push("/page/customers");
    } catch (error) {
      // Maneja cualquier error que ocurra durante el guardado.
      console.error("Error al guardar cliente:", error);
    }
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
        
        <IonCard >
          <IonTitle style={{ padding: '10px 16px' }}> {/* Padding opcional */}
            {id === "new" ? "Agregar Cliente" : "Editar Cliente"}
          </IonTitle>
        </IonCard>        
        <IonCard>

          <IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Nombre</IonLabel>
                  <IonInput
                    onIonChange={(e) => setCustomer({ ...customer, firstname: String(e.detail.value) })}
                    value={customer.firstname || ""}
                  />
                </IonItem>
              </IonCol>
            

            
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Apellido</IonLabel>
                  <IonInput
                    onIonChange={(e) => setCustomer({ ...customer, lastname: String(e.detail.value) })}
                    value={customer.lastname || ""}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    onIonChange={(e) => setCustomer({ ...customer, email: String(e.detail.value) })}
                    value={customer.email || ""}
                  />
                </IonItem>
              </IonCol>
            

            
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Dirección</IonLabel>
                  <IonInput
                    onIonChange={(e) => setCustomer({ ...customer, address: String(e.detail.value) })}
                    value={customer.address || ""}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="stacked">Teléfono</IonLabel>
                  <IonInput
                    onIonChange={(e) => setCustomer({ ...customer, phone: String(e.detail.value) })}
                    value={customer.phone || ""}
                  />
                </IonItem>
              </IonCol>
            </IonRow>

          </IonRow>

          <IonItem>
            <IonButton onClick={save} color="success" fill="solid" slot="end" size="default">
              <IonIcon icon={checkmark} />
              Guardar
            </IonButton>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CustomerEdit;