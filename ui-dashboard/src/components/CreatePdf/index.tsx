import styles from '../../App.module.css';
import { format } from "../../utils/FormatPrice";
import generatePDF from 'react-to-pdf';
import banner from '../../assets/logo.jpg';
import type Launch from '../../models/Launch';
import type Part from '../../models/Part';

interface CreatePdfProps {
  data: Launch[]
  partsList: Part[]
  totalPrice: number
}

function CreatePdf({ data, partsList, totalPrice }: CreatePdfProps) {
  const getTargetElement = () => document.getElementById('content-id');

  return (
    <section>
      <div className={styles.dataPdf} id="content-id">
        <ul>
          {data.map((item) =>
            <li key={item.id}>
              <img src={banner} alt="Banner" />
              <h2 className={styles.subTitle}>Cliente: <strong>{item.name}</strong></h2>
              <p>Telefone: {item.tel}</p>
              <span>Data do lançamento: <strong>{item.date}</strong></span>
              <h4>Modelo do veiculo: <strong>{item.model}</strong></h4>
              <div className={styles.flex}>
                <p>Kilometragem: <strong>{item.kilometer}</strong></p>
                <p>Placa: <strong>{item.plate}</strong></p>
              </div>
              <p>Observação: {item.observation}</p>
            </li>
          )}
        </ul>
        <div className={`${styles.border}`}>
          <ul>
            {partsList.map((part) => (
              <li key={part.id}>
                <div className={styles.flex}>
                  <p>{part.title}</p>
                  <span>{format(part.value)}</span>
                </div>
              </li>
            ))}
            <h5>Valor total: <strong className='text-red-700'>{format(totalPrice)}</strong></h5>
          </ul>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.btnPdf} onClick={() => generatePDF(getTargetElement, { filename: 'nota.pdf' })}>Gerar PDF</button>
      </div>
    </section>
  );
}

export default CreatePdf;
