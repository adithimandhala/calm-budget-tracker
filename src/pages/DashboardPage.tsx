import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import ModernFinanceDashboard from "@/components/ModernFinanceDashboard";

const DashboardPage = () => {
  return (
    <PageWrapper>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ModernFinanceDashboard />
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;


