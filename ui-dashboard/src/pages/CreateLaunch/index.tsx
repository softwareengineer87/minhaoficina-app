import { useState } from 'react';
import { Formlaunch } from '../../components/FormLaunch';
import './create.css';
import type Launch from '../../models/Launch';

function CreateLaunch() {

  const [launch, setLaunch] = useState<Launch>({} as Launch);

  return (
    <section className='launch-container'>
      <div className='launch'>
        <h2>Criar lançamento</h2>
        <Formlaunch
          launch={launch}
          changeLaunch={setLaunch}
        />
      </div>
    </section>
  );
}

export { CreateLaunch }

