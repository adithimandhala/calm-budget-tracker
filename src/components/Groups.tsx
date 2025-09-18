import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface Member {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string; // memberId
  date: string;
}

interface Group {
  id: string;
  name: string;
  members: Member[];
  expenses: Expense[];
}

const STORAGE_KEY = "cb_groups_v1";

const uid = () => Math.random().toString(36).slice(2, 10);

const Groups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [newGroupName, setNewGroupName] = useState("");
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setGroups(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
  }, [groups]);

  const activeGroup = useMemo(() => groups.find(g => g.id === activeGroupId) || null, [groups, activeGroupId]);

  const addGroup = () => {
    if (!newGroupName.trim()) return;
    const g: Group = { id: uid(), name: newGroupName.trim(), members: [], expenses: [] };
    setGroups(prev => [g, ...prev]);
    setNewGroupName("");
    setActiveGroupId(g.id);
  };

  const addMember = (groupId: string, name: string) => {
    if (!name.trim()) return;
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, members: [...g.members, { id: uid(), name: name.trim() }] } : g));
  };

  const removeMember = (groupId: string, memberId: string) => {
    setGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      return { ...g, members: g.members.filter(m => m.id !== memberId), expenses: g.expenses.filter(e => e.paidBy !== memberId) };
    }));
  };

  const addExpense = (groupId: string, expense: Omit<Expense, "id" | "date">) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, expenses: [{ id: uid(), date: new Date().toISOString(), ...expense }, ...g.expenses] } : g));
  };

  const balances = useMemo(() => {
    if (!activeGroup || activeGroup.members.length === 0) return {} as Record<string, number>;
    const totals: Record<string, number> = Object.fromEntries(activeGroup.members.map(m => [m.id, 0]));
    const membersCount = activeGroup.members.length;
    for (const exp of activeGroup.expenses) {
      const share = exp.amount / membersCount;
      for (const m of activeGroup.members) {
        totals[m.id] -= share;
      }
      totals[exp.paidBy] += exp.amount;
    }
    return totals;
  }, [activeGroup]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Groups</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="New group name" value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} />
            <Button onClick={addGroup}>Create</Button>
          </div>
          <Separator />
          <div className="space-y-2">
            {groups.length === 0 && <div className="text-sm text-muted-foreground">No groups yet. Create one to get started.</div>}
            {groups.map(g => (
              <button key={g.id} className={`w-full text-left text-sm px-3 py-2 rounded-md border ${activeGroupId === g.id ? "bg-accent" : "bg-card"}`} onClick={() => setActiveGroupId(g.id)}>
                {g.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>{activeGroup ? activeGroup.name : "Select a group"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!activeGroup && <div className="text-sm text-muted-foreground">Choose a group to manage members and expenses.</div>}
          {activeGroup && (
            <>
              <MembersEditor group={activeGroup} onAdd={(name) => addMember(activeGroup.id, name)} onRemove={(id) => removeMember(activeGroup.id, id)} />
              <ExpenseEditor group={activeGroup} onAdd={(e) => addExpense(activeGroup.id, e)} />
              <Balances group={activeGroup} balances={balances} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const MembersEditor = ({ group, onAdd, onRemove }: { group: Group; onAdd: (name: string) => void; onRemove: (id: string) => void }) => {
  const [name, setName] = useState("");
  return (
    <div className="space-y-3">
      <div className="font-medium">Members</div>
      <div className="flex gap-2">
        <Input placeholder="Add member" value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={() => { onAdd(name); setName(""); }}>Add</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.members.map(m => (
          <div key={m.id} className="px-3 py-1 rounded-full border text-sm flex items-center gap-2">
            <span>{m.name}</span>
            <button className="text-muted-foreground hover:text-destructive" onClick={() => onRemove(m.id)}>×</button>
          </div>
        ))}
        {group.members.length === 0 && <div className="text-sm text-muted-foreground">No members yet.</div>}
      </div>
    </div>
  );
};

const ExpenseEditor = ({ group, onAdd }: { group: Group; onAdd: (e: Omit<Expense, "id" | "date">) => void }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  return (
    <div className="space-y-3">
      <div className="font-medium">Add Expense</div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select className="border rounded-md px-3 py-2 bg-background" value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          <option value="">Paid by</option>
          {group.members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        <Button onClick={() => {
          const value = parseFloat(amount);
          if (!description.trim() || !paidBy || !isFinite(value) || value <= 0) return;
          onAdd({ description: description.trim(), amount: value, paidBy });
          setDescription(""); setAmount(""); setPaidBy("");
        }}>Add</Button>
      </div>
      <div className="space-y-2">
        {group.expenses.length === 0 && <div className="text-sm text-muted-foreground">No expenses yet.</div>}
        {group.expenses.map(e => (
          <div key={e.id} className="text-sm flex justify-between border rounded-md px-3 py-2">
            <div>{e.description}</div>
            <div>₹{e.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Balances = ({ group, balances }: { group: Group; balances: Record<string, number> }) => {
  const items = group.members.map(m => ({ member: m, amount: balances[m.id] || 0 }));
  return (
    <div className="space-y-3">
      <div className="font-medium">Balances</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {items.map(({ member, amount }) => (
          <div key={member.id} className="border rounded-md px-3 py-2 text-sm flex justify-between">
            <span>{member.name}</span>
            <span className={amount >= 0 ? "text-green-600" : "text-red-600"}>{amount >= 0 ? "+" : ""}{amount.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-muted-foreground">Positive means the member should receive money; negative means they owe.</div>
    </div>
  );
};

export default Groups;
