export const API = {
  get token() {
    return localStorage.getItem("token") || "";
  },
  set token(value: string) {
    localStorage.setItem("token", value);
  },
  async request(path: string, options: RequestInit = {}) {
    const headers: any = { "Content-Type": "application/json", ...(options.headers || {}) };
    if (API.token) headers["Authorization"] = `Bearer ${API.token}`;
    const res = await fetch(`/api${path}`, { ...options, headers });
    const contentType = res.headers.get("content-type") || "";
    const maybeJson = contentType.includes("application/json");
    if (!res.ok) {
      let message = res.statusText;
      if (maybeJson) {
        try {
          const body = await res.json();
          message = body?.error || body?.message || message;
        } catch {}
      } else {
        try {
          const text = await res.text();
          if (text) message = text;
        } catch {}
      }
      throw new Error(message);
    }
    if (maybeJson) {
      try {
        return await res.json();
      } catch {
        return null;
      }
    }
    return await res.text();
  },
  auth: {
    signup(data: { accountName: string; accountNumber: string; ifsc: string; password: string }) {
      return API.request("/auth/signup", { method: "POST", body: JSON.stringify(data) });
    },
    login(data: { accountNumber: string; password: string }) {
      return API.request("/auth/login", { method: "POST", body: JSON.stringify(data) });
    },
  },
  budgets: {
    create(data: any) {
      return API.request("/budgets", { method: "POST", body: JSON.stringify(data) });
    },
    update(budgetId: string, data: any) {
      return API.request(`/budgets/${budgetId}`, { method: "PATCH", body: JSON.stringify(data) });
    },
  },
  groups: {
    create(data: { groupName: string; purpose?: string; members?: string[] }) {
      return API.request("/groups", { method: "POST", body: JSON.stringify(data) });
    },
    addMembers(groupId: string, members: string[]) {
      return API.request(`/groups/${groupId}/members`, { method: "POST", body: JSON.stringify({ members }) });
    },
    removeMember(groupId: string, memberId: string) {
      return API.request(`/groups/${groupId}/members/${memberId}`, { method: "DELETE" });
    },
    details(groupId: string) {
      return API.request(`/groups/${groupId}`);
    },
    addExpense(groupId: string, data: { description: string; amount: number; paidBy: string }) {
      return API.request(`/groups/${groupId}/expenses`, { method: "POST", body: JSON.stringify(data) });
    },
    balances(groupId: string) {
      return API.request(`/groups/${groupId}/balances`);
    },
    delete(groupId: string) {
      return API.request(`/groups/${groupId}`, { method: "DELETE" });
    },
  },
};


