import { IonContent } from '@ionic/react';
import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonContent>
      <div id="container">
        <strong>{name}</strong>
        <p>
          Explora <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a>
        </p>
      </div>
    </IonContent>
  );
};

export default ExploreContainer;
