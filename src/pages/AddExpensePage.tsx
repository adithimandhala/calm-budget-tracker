import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import ExpenseForm from "@/components/ExpenseForm";

const AddExpensePage = () => {
  return (
    <PageWrapper>
      <Header />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExpenseForm />
      </main>
    </PageWrapper>
  );
};

export default AddExpensePage;


