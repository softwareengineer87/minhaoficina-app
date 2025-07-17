import { useState } from 'react';
import type Launch from '../../models/Launch';
import './form-launch.css';
import { useNavigate } from 'react-router-dom';
import useLaunch from '../../data/hooks/useLaunch';
import { Message } from '../Message';

interface FormLaunchProps {
  changeLaunch(launch: Launch): void;
  launch: Launch;
}

function Formlaunch({
  changeLaunch,
  launch
}: FormLaunchProps) {

  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [file, setFile] = useState(null);
  const [messagePhoto, setMessagePhoto] = useState<string>('');
  const [partName, setPartName] = useState<string>('');
  const [partPrice, setPartPrice] = useState<string>('');
  const navigate = useNavigate();

  const {
    saveLaunch,
    savePhoto,
    savePart,
    dataPhoto,
    idLaunch,
    message,
    status,
    activeMessage
  } = useLaunch();

  function changeFile(e: any) {
    if (!e.target.files[0]) return;
    setFile(e.target.files[0]);
  }

  async function handleForm() {
    await saveLaunch(launch);
    changeLaunch({} as Launch);
  }

  function timeMessage() {
    setTimeout(() => {
      setShowMessage(false);
      setMessagePhoto('');
    }, 5000);
  }

  async function handlePhoto() {
    setShowMessage(true);
    const response = await savePhoto(file, idLaunch);
    if (response?.ok) {
      setMessagePhoto('Imagem salva com sucesso!');
    } else {
      setMessagePhoto('A imagem é obrigátória.');
    }
    timeMessage();
  }

  async function handlePart() {
    setShowMessage(true);
    const response = await savePart(partName, Number(partPrice), idLaunch);
    if (response?.ok) {
      setMessagePhoto('Peca salva com sucesso!');
    } else {
      setMessagePhoto('Cadastre a nota primeiro!');
    }
    timeMessage();
  }
  console.log(dataPhoto);

  return (
    <section className={`
      form-launch-container
      }
    `}>
      <Message
        message={message}
        status={status}
        activeMessage={activeMessage}
      />
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
                onChange={(e) => changeLaunch({ ...launch, kilometer: e.target.value })}
                value={launch.kilometer}
                type='number'
                id='kilometer'
                placeholder='Kilometragem'
              />
            </div>
          </div>
          <div className='box-inputs'>
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
        </form>
        <div className='buttons-form'>
          <button onClick={handleForm} className='btn-save'>Salvar nota</button>
          <button
            onClick={() => navigate('/')}
            className='cancell'>
            Cancelar
          </button>
        </div>


        <form className='forms'>
          <div className='input-form'>
            <label htmlFor='file'>Fotos</label>
            <input
              onChange={changeFile}
              type='file'
              name='file'
              id='file'
            />
          </div>
        </form>
        {showMessage && (
          <p className='message-photo'>{messagePhoto}</p>
        )}
        <button onClick={handlePhoto} className='btn-photo'>Salvar foto</button>

        <form className='forms'>
          <div className='box-inputs'>
            <div className='input-form'>
              <label htmlFor='name'>Nome da peça</label>
              <input
                onChange={(e) => setPartName(e.target.value)}
                value={partPrice}
                type='text'
                id='name'
                placeholder='Nome da peça'
              />
            </div>
            <div className='input-form'>
              <label htmlFor='price'>Preço</label>
              <input
                onChange={(e) => setPartPrice(e.target.value)}
                value={partName}
                type='numer'
                id='price'
                placeholder='Preço'
              />
            </div>
          </div>
        </form>
        {showMessage && (
          <p className='message-photo'>{messagePhoto}</p>
        )}
        <button onClick={handlePart} className='btn-photo'>Salvar peça</button>

      </div>
    </section>
  );
}

export { Formlaunch }

