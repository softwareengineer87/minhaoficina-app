import { IconEyeDollar, IconNote } from '@tabler/icons-react';
import { StatisticCard } from '../../components/StatisticCard';
import './home.css';

function Home() {
  return (
    <main className="home-container">
      <h1>Estatisticas</h1>
      <section className='cards'>
        <StatisticCard
          icon={<IconNote />}
          total={10}
          description='Total de notas criadas'
        />
        <StatisticCard
          icon={<IconEyeDollar />}
          total={1000}
          description='Total de R$ em serviços'
        />
      </section>
    </main>
  );
}

export default Home;

