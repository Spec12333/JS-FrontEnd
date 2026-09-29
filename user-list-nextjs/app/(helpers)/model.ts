import { readFile, writeFile } from "fs/promises";
import type { User } from "./types";
import generateRandomId from "./idgenerator";

const PATH = "./users.json";

export const getUsers = async (): Promise<User[]> => {
  const content = await readFile(PATH, "utf-8");
  if (!content) {
    return [];
  }
  return JSON.parse(content);
};

export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  const users = await getUsers();
  const newUserId = generateRandomId();
  const newUser = {
    id: newUserId,
    ...user,
  };
  users.push(newUser);
  await writeFile(PATH, JSON.stringify(users), "utf-8");
  return newUser;
};

export const getUserById = async (id: string | number) => {
  const users = await getUsers();
  return users.find((user) => Number(user.id) === Number(id));
};

export const updateUser = async (id: number, data: Omit<User, "id">) => {
  const users = await getUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  users[index] = { id: users[index].id, ...data };
  await writeFile(PATH, JSON.stringify(users), "utf-8");
  return users[index];
};

export const deleteUser = async (id: number): Promise<boolean> => {
  let users = await getUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return false;
  }
  users = users.filter((user) => user.id !== id);
  await writeFile(PATH, JSON.stringify(users), "utf-8");
  return true;
};
