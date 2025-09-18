import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import BudgetBuddy from "@/components/BudgetBuddy";

const AIAssistantPage = () => {
  return (
    <PageWrapper>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BudgetBuddy />
      </main>
    </PageWrapper>
  );
};

export default AIAssistantPage;


