import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { add, close, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Supplier from "./Supplier";
import { removeSupplier, searchSuppliers } from "./SupplierApi";


/**
 * Componente para mostrar la lista de proveedores.
 */
const SupplierList: React.FC = () => {
    // Obtiene el nombre del parámetro de la URL.
    const { name } = useParams<{ name: string }>();
    // Estado para almacenar la lista de proveedores.
    const [proveedores, setClientes] = useState<Supplier[]>([]);
    // Hook para manejar la navegación entre rutas.
    const history = useHistory();

    /**
     * Efecto secundario que se ejecuta al montar el componente y cada vez que cambia la ruta.
     * Carga la lista de proveedores desde la API.
     */
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                // Llama a la API para obtener la lista de proveedores.
                const result = await searchSuppliers();
                // Actualiza el estado con la lista de proveedores obtenida.
                setClientes(result);
            } catch (error) {
                // Maneja cualquier error que ocurra durante la carga de proveedores.
                console.error("Error al cargar proveedores:", error);
            }
        };

        // Llama a la función para cargar los proveedores.
        fetchSuppliers();
        // Se ejecuta cada vez que cambia la ruta (history.location.pathname).
    }, [history.location.pathname]);

    /**
     * Función asíncrona para eliminar un proveedore por su ID.
     * Actualiza la lista de proveedores después de la eliminación sin hacer otra llamada a la API.
     * @param {string} id El ID del proveedore a eliminar.
     */
    const remove = async (id: string) => {
        try {
            // Llama a la API para eliminar el proveedore.
            await removeSupplier(Number(id));
            // Actualiza el estado filtrando la lista de proveedores para excluir el proveedore eliminado.
            setClientes(proveedores.filter((proveedore) => proveedore.id !== Number(id)));
        } catch (error) {
            // Maneja cualquier error que ocurra durante la eliminación.
            console.error("Error al eliminar proveedore:", error);
        }
    };

    /**
     * Función para navegar a la página de agregar un nuevo proveedore.
     */
    const addSupplier = () => {
        // Navega a la ruta para agregar un nuevo proveedore.
        history.push("/page/supplier/new");
    };

    /**
     * Función para navegar a la página de edición de un proveedore.
     * @param {string} id El ID del proveedore a editar.
     */
    const editSupplier = (id: string) => {
        // Navega a la ruta para editar el proveedore con el ID especificado.
        history.push(`/page/supplier/${id}`);
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

                {/*Contenido proveedores - ion grid (basic usage)*/}

                <IonCard>
                    <IonTitle style={{ padding: '10px 16px' }}>
                        Gestión de Clientes
                    </IonTitle>
                </IonCard>
                <IonCard>
                    <IonItem>
                        <IonButton
                            onClick={addSupplier}
                            color="primary"
                            fill="solid"
                            slot="end"
                            size="default"
                        >
                            <IonIcon icon={add} />
                            Agregar Cliente
                        </IonButton>
                    </IonItem>


                    {/* Tabla de proveedores */}

                    <IonGrid className="table">
                        <IonRow>
                            <IonCol>Nombre</IonCol>
                            <IonCol>Email</IonCol>
                            <IonCol>Teléfono</IonCol>
                            <IonCol>Web</IonCol>
                            <IonCol>Acciones</IonCol>
                        </IonRow>

                        {proveedores.length > 0 ? (
                            proveedores.map((proveedor) => (
                                <IonRow key={proveedor.id}>
                                    <IonCol>{proveedor.name}</IonCol>
                                    <IonCol>{proveedor.email}</IonCol>
                                    <IonCol>{proveedor.phone}</IonCol>
                                    <IonCol>{proveedor.web}</IonCol>
                                    <IonCol>

                                        {/* Botones de acción para editar y eliminar */}
                                        <IonButton color="primary" fill="clear" onClick={() => editSupplier(String(proveedor.id))}>
                                            <IonIcon icon={pencil} slot="icon-only" />
                                        </IonButton>
                                        <IonButton color="danger" fill="clear" onClick={() => remove(String(proveedor.id))}>
                                            <IonIcon icon={close} slot="icon-only" />
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            ))
                        ) : (

                            // Se muestra un mensaje si no hay clientes registrados.  
                            <IonRow>
                                <IonCol size="12" className="ion-text-center">
                                    No hay proveedores registrados.
                                </IonCol>
                            </IonRow>
                        )}
                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage >
    );
};


export default SupplierList;