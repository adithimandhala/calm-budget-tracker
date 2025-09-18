import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import BudgetDashboard from "@/components/BudgetDashboard";
import AttractiveCharts from "@/components/AttractiveCharts";

const DashboardPage = () => {
  return (
    <PageWrapper>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <BudgetDashboard />
        <AttractiveCharts />
      </main>
    </PageWrapper>
  );
};

export default DashboardPage;


