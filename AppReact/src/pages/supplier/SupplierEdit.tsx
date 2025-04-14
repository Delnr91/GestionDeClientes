import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { checkmark } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import Supplier from "./Supplier";
import { saveSupplier, searchSupplierById } from "./SupplierApi";


/**
 * Componente para editar o agregar un proveedor.
 */
const SupplierEdit: React.FC = () => {
  // Obtiene el nombre del parámetro de la URL.
  const { name } = useParams<{ name: string }>();
  // Estado para almacenar el objeto Supplier que se está editando o creando.
  const [supplier, setSupplier] = useState<Supplier>({} as Supplier);
  // Hook para manejar la navegación entre rutas.
  const history = useHistory();
  // Hook para obtener información sobre la ruta actual.
  const routeMatch = useRouteMatch<{ id: string }>("/page/supplier/:id");
  // Obtiene el ID del proveedor de la ruta. Si es "new", se está creando un nuevo proveedor.
  const id = routeMatch?.params?.id;

  /**
   * Efecto secundario que se ejecuta cuando el ID cambia.
   * Llama a la función search para cargar los datos del proveedor.
   */
  useEffect(() => {
    search();
  }, [id]);

  /**
   * Función asíncrona para buscar y cargar los datos del proveedor.
   * Si el ID es "new", inicializa el estado con un objeto Supplier vacío.
   * Si el ID es un número, llama a la API para obtener el proveedor por su ID.
   */
  const search = async () => {
    if (id === "new") {
      setSupplier({} as Supplier);
    } else {
      try {
        // Convierte el ID a número y llama a la API para obtener el proveedor.
        const result = await searchSupplierById(Number(id) || 0);
        // Si se encuentra el proveedor, actualiza el estado.
        if (result) setSupplier(result);
      } catch (error) {
        // Maneja cualquier error que ocurra durante la búsqueda.
        console.error("Error al cargar proveedor:", error);
      }
    }
  };

  /**
   * Función asíncrona para guardar los datos del proveedor.
   * Llama a la API para guardar el proveedor y luego navega a la lista de proveedors.
   */
  const save = async () => {
    try {
      // Llama a la API para guardar el proveedor.
      await saveSupplier(supplier);
      // Navega a la lista de proveedors.
      history.push("/page/suppliers");
    } catch (error) {
      // Maneja cualquier error que ocurra durante el guardado.
      console.error("Error al guardar proveedor:", error);
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

                <IonContent>
                    <IonCard>
                        <IonTitle>{id === 'new' ? 'Agregar Proveedor' : 'Editar Proveedor'}</IonTitle>

                        <IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonInput
                                            label="Nombre"
                                            labelPlacement="stacked"
                                            value={supplier.name}
                                            onIonChange={(e) => setSupplier({ ...supplier, name: e.detail.value || '' })}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonInput
                                            label="Contacto"
                                            labelPlacement="stacked"
                                            value={supplier.contact}
                                            onIonChange={(e) => setSupplier({ ...supplier, contact: e.detail.value || '' })}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonInput
                                            label="Email"
                                            labelPlacement="stacked"
                                            value={supplier.email}
                                            onIonChange={(e) => setSupplier({ ...supplier, email: e.detail.value || '' })}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonInput
                                            label="Teléfono"
                                            labelPlacement="stacked"
                                            value={supplier.phone}
                                            onIonChange={(e) => setSupplier({ ...supplier, phone: e.detail.value || '' })}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonInput
                                            label="Dirección"
                                            labelPlacement="stacked"
                                            value={supplier.address}
                                            onIonChange={(e) => setSupplier({ ...supplier, address: e.detail.value || '' })}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonInput
                                            label="Web"
                                            labelPlacement="stacked"
                                            value={supplier.web}
                                            onIonChange={(e) => setSupplier({ ...supplier, web: e.detail.value || '' })}
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
            </IonContent>
        </IonPage>
    );
};

export default SupplierEdit;