export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "waiter";
  active: boolean;
  createdAt: string;
  lastLogin: string | null;
}

export const users: User[] = [
  {
    id: 1,
    name: "Cristopher Adrián Ávila López",
    email: "cris@gmail.com",
    password: "1234",
    role: "admin",
    active: true,
    createdAt: "01/11/25",
    lastLogin: "09/11/25 22:45",
  },
  {
    id: 2,
    name: "Nancy Josefina Salazar López",
    email: "nancy@gmail.com",
    password: "1234",
    role: "waiter",
    active: true,
    createdAt: "01/11/25",
    lastLogin: "09/11/25 18:30",
  },
];
