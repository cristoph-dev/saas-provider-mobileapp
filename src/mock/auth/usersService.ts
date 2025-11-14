import type { User } from "./users";
import { users } from "./users";

export const UsersService = {
  getAll(): User[] {
    return users;
  },

  getById(id: number): User | undefined {
    return users.find((u) => u.id === id);
  },

  login(email: string, password: string): User {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) throw new Error("Invalid email or password");
    if (!user.active) throw new Error("User is inactive");

    user.lastLogin = new Date().toLocaleString("es-CL"); // new Date().toLocaleDateString("es-CL"); -> Solo fecha. Y new Date().toLocaleTimeString("es-CL"); -> para solo hora
    return user;
  },

  register(
    name: string,
    email: string,
    password: string,
    role: "admin" | "waiter" = "waiter"
  ): User {
    if (users.some((u) => u.email === email))
      throw new Error("Email is already registered");

    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      password,
      role,
      active: true,
      createdAt: new Date().toLocaleDateString("es-CL"),
      lastLogin: null,
    };

    users.push(newUser);
    return newUser;
  },

  deactivate(id: number): User | undefined {
    const user = users.find((u) => u.id === id);
    if (user) user.active = false;
    return user;
  },
};
