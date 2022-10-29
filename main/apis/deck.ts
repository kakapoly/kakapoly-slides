/**
 * https://cloud.google.com/apis/design/naming_convention#method_names
 */
// List, Get, Create, Update, Delete
// export async

import axios from "@/libs/axios";
import { useAuthStore } from "@/stores/auth";
import { Role } from "./role";

export interface Deck {
  id: string;
  title: string;
  publicAccess: boolean;
  roles: Array<Role>;
}

export async function listDecks() {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error("Token doesn't exist.");
  }

  const { data } = await axios.get<Array<Deck>>("/decks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export async function getDeck(id: string) {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error("Token doesn't exist.");
  }

  const { data } = await axios.get<Deck>(`/decks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export interface CreateDeckVariables {
  title: Deck["title"];
}

export async function createDeck(variables: CreateDeckVariables) {
  const token = useAuthStore.getState().token;

  const { data } = await axios.post<Deck>("/decks", variables, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export interface UpdateDeckVariables extends CreateDeckVariables {}

export async function updateDeck(id: string, variables: UpdateDeckVariables) {
  const token = useAuthStore.getState().token;

  const { data } = await axios.patch<Deck>(`/decks/${id}`, variables, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}
