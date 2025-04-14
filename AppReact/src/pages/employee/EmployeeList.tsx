import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { add, close, pencil } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Employee from "./Employee";
import { removeEmployee, searchEmployees } from "./EmployeeApi";

/**
 * Componente para mostrar la lista de Empleados.
 */
const EmployeeList: React.FC = () => {
    // Obtiene el nombre del parámetro de la URL.
    const { name } = useParams<{ name: string }>();
    // Estado para almacenar la lista de empleados.
    const [empleados, setEmpleados] = useState<Employee[]>([]);
    // Hook para manejar la navegación entre rutas.
    const history = useHistory();

    /**
       * Efecto secundario que se ejecuta al montar el componente y cada vez que cambia la ruta.
       * Carga la lista de empleados desde la API.
       */
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                // Llama a la API para obtener la lista de empleados.
                const result = await searchEmployees();
                // Actualiza el estado con la lista de empleados obtenida.
                setEmpleados(result);
            } catch (error) {
                // Maneja cualquier error que ocurra durante la carga de empleados.
                console.error("Error al cargar empleados:", error);
            }
        };

        // Llama a la función para cargar los empleados.
        fetchEmployees();
        // Se ejecuta cada vez que cambia la ruta (history.location.pathname).
    }, [history.location.pathname]);

    /**
     * Función asíncrona para eliminar un empleado por su ID.
     * Actualiza la lista de empleados después de la eliminación sin hacer otra llamada a la API.
     * @param {string} id El ID del empleado a eliminar.
     */
    const remove = async (id: string) => {
        try {
            // Llama a la API para eliminar el empleado.
            await removeEmployee(Number(id));
            // Actualiza el estado filtrando la lista de empleados para excluir el empleado eliminado.
            setEmpleados(empleados.filter((empleado) => empleado.id !== Number(id)));
        } catch (error) {
            // Maneja cualquier error que ocurra durante la eliminación.
            console.error("Error al eliminar empleado:", error);
        }
    };

    /**
     * Función para navegar a la página de agregar un nuevo empleado.
     */
    const addEmployee = () => {
        // Navega a la ruta para agregar un nuevo empleado.
        history.push("/page/employee/new");
    };

    /**
     * Función para navegar a la página de edición de un empleado.
     * @param {string} id El ID del empleado a editar.
     */
    const editEmployee = (id: string) => {
        // Navega a la ruta para editar el empleado con el ID especificado.
        history.push(`/page/employee/${id}`);
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
                    <IonTitle>Gestión de Empleados</IonTitle>

                    <IonItem>
                        <IonButton
                            onClick={addEmployee}
                            color="primary"
                            fill="solid"
                            slot="end"
                            size="default"
                        >
                            <IonIcon icon={add} />
                            Agregar Empleado
                        </IonButton>
                    </IonItem>

                    {/* Tabla de empleados */}

                    <IonGrid className="table">
                        <IonRow>
                            <IonCol><strong>Nombre</strong></IonCol>
                            <IonCol><strong>Email</strong></IonCol>
                            <IonCol><strong>Teléfono</strong></IonCol>
                            <IonCol><strong>Dirección</strong></IonCol>
                            <IonCol><strong>Acciones</strong></IonCol>
                        </IonRow>

                        {empleados.length > 0 ? (
                            empleados.map((empleado) => (
                                <IonRow key={empleado.id}>
                                    <IonCol>{empleado.firstname} {empleado.lastname}</IonCol>
                                    <IonCol>{empleado.email}</IonCol>
                                    <IonCol>{empleado.phone}</IonCol>
                                    <IonCol>{empleado.address}</IonCol>
                                    <IonCol>

                                        {/* Botones de acción para editar y eliminar */}

                                        <IonButton color="primary" fill="clear" onClick={() => editEmployee(String(empleado.id))}>
                                            <IonIcon icon={pencil} slot="icon-only" />
                                        </IonButton>
                                        <IonButton color="danger" fill="clear" onClick={() => remove(String(empleado.id))}>
                                            <IonIcon icon={close} slot="icon-only" />
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            ))
                        ) : (

                             // Se muestra un mensaje si no hay empleados registrados.  
                            <IonRow>
                                <IonCol size="12" className="ion-text-center">
                                    No hay empleados registrados.
                                </IonCol>
                            </IonRow>
                        )}
                    </IonGrid>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default EmployeeList;