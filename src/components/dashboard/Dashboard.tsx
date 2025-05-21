import { component$ } from '@builder.io/qwik';

interface DashboardProps {
  userId: string;
}

const Dashboard = component$<DashboardProps>(({ userId }) => {
  return <div>{userId}</div>;
});
export default Dashboard;
