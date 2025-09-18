import { createContext, useContext, ReactNode } from "react";
import { useBudgetTracker } from "./useBudgetTracker";

const BudgetContext = createContext<ReturnType<typeof useBudgetTracker> | null>(null);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const value = useBudgetTracker();
  return <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>;
};

export const useBudget = () => {
  const ctx = useContext(BudgetContext);
  if (!ctx) throw new Error("useBudget must be used within a BudgetProvider");
  return ctx;
};


