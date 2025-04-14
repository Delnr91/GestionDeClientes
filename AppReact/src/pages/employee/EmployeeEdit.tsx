import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { checkmark } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router";
import Employee from "./Employee";
import { saveEmployee, searchEmployeeById } from "./EmployeeApi";

/**
 * Componente para editar o agregar un empleado.
 */
const EmployeeEdit: React.FC = () => {
  // Obtiene el nombre del parámetro de la URL.
  const { name } = useParams<{ name: string }>();
  // Estado para almacenar el objeto Employee que se está editando o creando.
  const [employee, setEmployee] = useState<Employee>({} as Employee);
  // Hook para manejar la navegación entre rutas.
  const history = useHistory();
  // Hook para obtener información sobre la ruta actual.
  const routeMatch = useRouteMatch<{ id: string }>("/page/employee/:id");
  // Obtiene el ID del empleado de la ruta. Si es "new", se está creando un nuevo empleado.
  const id = routeMatch?.params?.id;

  /**
   * Efecto secundario que se ejecuta cuando el ID cambia.
   * Llama a la función search para cargar los datos del empleado.
   */
  useEffect(() => {
    search();
  }, [id]);

  /**
   * Función asíncrona para buscar y cargar los datos del empleado.
   * Si el ID es "new", inicializa el estado con un objeto Employee vacío.
   * Si el ID es un número, llama a la API para obtener el empleado por su ID.
   */
  const search = async () => {
    if (id === "new") {
      setEmployee({} as Employee);
    } else {
      try {
        // Convierte el ID a número y llama a la API para obtener el empleado.
        const result = await searchEmployeeById(Number(id) || 0);
        // Si se encuentra el empleado, actualiza el estado.
        if (result) setEmployee(result);
      } catch (error) {
        // Maneja cualquier error que ocurra durante la búsqueda.
        console.error("Error al cargar empleado:", error);
      }
    }
  };

  /**
   * Función asíncrona para guardar los datos del empleado.
   * Llama a la API para guardar el empleado y luego navega a la lista de empleados.
   */
  const save = async () => {
    try {
      // Llama a la API para guardar el empleado.
      await saveEmployee(employee);
      // Navega a la lista de empleados.
      history.push("/page/employees");
    } catch (error) {
      // Maneja cualquier error que ocurra durante el guardado.
      console.error("Error al guardar empleado:", error);
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
                        <IonTitle>{id === 'new' ? 'Agregar Empleado' : 'Editar Empleado'}</IonTitle>

                        <IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonInput
                                            label="Nombre"
                                            labelPlacement="stacked"
                                            value={employee.firstname}
                                            onIonChange={(e) => setEmployee({ ...employee, firstname: e.detail.value || '' })}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonInput
                                            label="Apellido"
                                            labelPlacement="stacked"
                                            value={employee.lastname}
                                            onIonChange={(e) => setEmployee({ ...employee, lastname: e.detail.value || '' })}
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
                                            value={employee.email}
                                            onIonChange={(e) => setEmployee({ ...employee, email: e.detail.value || '' })}
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
                                            value={employee.phone}
                                            onIonChange={(e) => setEmployee({ ...employee, phone: e.detail.value || '' })}
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
                                            value={employee.address}
                                            onIonChange={(e) => setEmployee({ ...employee, address: e.detail.value || '' })}
                                        />
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonItem>
                                        <IonInput
                                            label="Salario"
                                            labelPlacement="stacked"
                                            value={employee.salary}
                                            onIonChange={(e) => setEmployee({ ...employee, salary: Number(e.detail.value) || 0 })}
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

export default EmployeeEdit;