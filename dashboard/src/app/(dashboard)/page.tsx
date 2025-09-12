
import { StatisticCard } from "@/components/StatisticCard";
import { IconEyeDollar, IconNote } from "@tabler/icons-react";

export default function Home() {

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
