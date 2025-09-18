import Header from "@/components/Header";
import PageWrapper from "@/components/PageWrapper";
import Groups from "@/components/Groups";

const GroupsPage = () => {
  return (
    <PageWrapper>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Groups />
      </main>
    </PageWrapper>
  );
};

export default GroupsPage;


