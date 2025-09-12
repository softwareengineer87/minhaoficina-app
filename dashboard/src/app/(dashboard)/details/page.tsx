import CreatePdf from "@/components/CreatePdf";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import useLaunch from "@/data/hooks/useLaunch";
import Part from "@/models/Part";
import { useEffect, useState } from "react";

function Details() {
  const { id } = useParams();
  const { launch } = useLaunch();
  const [dataLaunch, setDataLaunch] = useState<Launch[]>([]);

  function getLaunch() {
    const newLaunch = launch.filter((item) => item.id === id);
    setDataLaunch(newLaunch);
  }

  function getPartsList() {
    const newPartsList = launch.filter((item) => item.id === id);
    const partList: Part[] = [];

    newPartsList.forEach((item) => {
      item.partsList.map((part: Part) => {
        partList.push(part);
      });
    });

    return partList;
  }

  function getTotalPrice() {
    const newList = launch.filter((item) => item.id === id);
    let totalPrice: number = 0;

    newList.forEach((item) => {
      item.partsList.map((part) => {
        totalPrice += part.value;
      });
    });

    return totalPrice;
  }

  useEffect(() => {
    getLaunch();
    getTotalPrice();
    getPartsList();

  }, [id]);

  return (
    <section className=''>
      <Header />
      <div className=''>
        <Sidebar />
        <div className=''>
          <h5>Detalhes do lançamento</h5>
          <ul>
            {dataLaunch.map((item) => (
              <li key={item.id}>
                <div className=''>
                  <p>Nome do cliente: <strong>{item.name}</strong></p>
                  <p>CPF: {item.cpf}</p>
                  <p>Telefone: <strong>{item.tel}</strong></p>
                </div>
                <span>data do lançamento: <strong>{item.date}</strong></span>
                <h5>Modelo do veiculo: {item.model}</h5>
                <div className=''>
                  <p>Kilometragem: {item.kilometer}</p>
                  <p>Placa: {item.plate}</p>
                </div>
                <p><strong>Observação: </strong>{item.observation}</p>
              </li>
            ))}
          </ul>
          <h5>Lista de Peça</h5>
          <ul className=''>
            {dataLaunch.map((item) => (
              <>
                {item.partsList.map((part) => (
                  <li key={part.id}>
                    <p><strong>Peça:</strong> {part.title} <strong>Valor:</strong> <h4>{format(part.value)}</h4></p>
                  </li>
                ))}
              </>
            ))}
          </ul>
          <p>Total: <strong>{format(getTotalPrice())}</strong></p>
        </div>
        <CreatePdf data={dataLaunch} partsList={getPartsList()} totalPrice={getTotalPrice()} />
      </div>

    </section>
  );
}

export default Details;
