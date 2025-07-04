import { useState } from 'react';
import type Launch from '../../models/Launch';
import './form-launch.css';
import { useNavigate } from 'react-router-dom';

interface FormLaunchProps {
  changeLaunch(launch: Launch): void;
  launch: Launch;
}

function Formlaunch({
  changeLaunch,
  launch
}: FormLaunchProps) {

  const [showForm, setShowForm] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <section className={`
      form-launch-container
      ${showForm && 'active'}
    `}>

      <div className='form-launch'>
        <form className='forms'>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='name'>Nome</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, name: e.target.value })}
                value={launch.name}
                type='text'
                id='name'
                placeholder='Nome'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='cpf'>CPF</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, cpf: e.target.value })}
                value={launch.cpf}
                type='text'
                id='cpf'
                placeholder='CPF' />
            </div>
            <div className='input-form'>
              <label htmlFor='tel'>Telefone</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, tel: e.target.value })}
                value={launch.tel}
                type='text'
                id='tel'
                placeholder='Telefone'
              />
            </div>
          </div>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='model'>Modelo</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, model: e.target.value })}
                value={launch.model}
                type='text'
                id='model'
                placeholder='Modelo'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='kilometer'>Kilometragem</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, kilometer: Number(e.target.value) })}
                value={launch.kilometer}
                type='number'
                id='kilometer'
                placeholder='Kilometragem'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='plate'>Placa</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, plate: e.target.value })}
                value={launch.plate}
                type='text'
                id='plate'
                placeholder='Placa'
              />
            </div>
          </div>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='observation'>Observação</label>
              <textarea
                onChange={(e) => changeLaunch({ ...launch, observation: e.target.value })}
                value={launch.observation}
                id='plate'
                placeholder='Observação'
              >
              </textarea>
            </div>
            <div className='input-form'>
              <label htmlFor='date'>Data</label>
              <input
                onChange={(e) => changeLaunch({ ...launch, date: e.target.value })}
                value={launch.date}
                type='date'
                id='date'
                placeholder='Data'
              />
            </div>
          </div>
          <div className='input-form'>
            <label htmlFor='file'>Fotos</label>
            <input
              onChange={(e) => changeLaunch({ ...launch, photos: e.target.value })}
              value={launch.plate}
              type='file'
              id='file'
              multiple
              placeholder='Placa'
            />
          </div>
        </form>
        <div className='buttons-form'>
          <button className='btn-save'>Salvar</button>
          <button
            onClick={() => navigate('/')}
            className='cancell'>
            Cancelar
          </button>
        </div>

      </div>
    </section>
  );
}

export { Formlaunch }

