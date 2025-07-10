import type { ReactElement } from 'react';
import './statistic.css';

interface StatisticCardProps {
  icon: ReactElement;
  total: number;
  description: string;
}

function StatisticCard({ icon, total, description }: StatisticCardProps) {
  return (
    <section className='statistic-container'>
      <div className='statistic'>
        <div className='box-total'>
          <span className='icon-stat'>{icon}</span>
          <h3>{total}</h3>
        </div>
        <p>{description}</p>
      </div>
    </section>
  );
}

export { StatisticCard }

