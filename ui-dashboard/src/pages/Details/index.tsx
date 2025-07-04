import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import styles from './Details.module.css';
import { useEffect, useState } from "react";
import Launch from "../../models/Launch";
import useLaunch from "../../hooks/useLaunch";
import { format } from "../../utils/FormatPrice";
import CreatePdf from "../../components/CreatePdf";
import Part from "../../models/Part";

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
            item.partsList.map((part) => {
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
        <section className={styles.container}>
            <Header />
            <div className={styles.content}>
                <Sidebar />
                <div className={styles.infos}>
                    <h5>Detalhes do lançamento</h5>
                    <ul>
                        {dataLaunch.map((item) => (
                            <li key={item.id}>
                                <div className={styles.flex}>
                                    <p>Nome do cliente: <strong>{item.name}</strong></p>
                                    <p>CPF: {item.cpf}</p>
                                    <p>Telefone: <strong>{item.tel}</strong></p>
                                </div>
                                <span>data do lançamento: <strong>{item.date}</strong></span>
                                <h5>Modelo do veiculo: {item.model}</h5>
                                <div className={styles.flex}>
                                    <p>Kilometragem: {item.kilometer}</p>
                                    <p>Placa: {item.plate}</p>
                                </div>
                                <p><strong>Observação: </strong>{item.observation}</p>
                            </li>
                        ))}
                    </ul>
                    <h5>Lista de peças</h5>
                    <ul className={styles.parts}>
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
