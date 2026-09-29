"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@/app/(helpers)/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    axios
      .get<{ users: User[] }>("/api/users")
      .then((response) => setUsers(response.data.users));
  }, []);

  return (
    <main className="min-h-screen px-4 py-8 text-slate-800 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-2xl shadow-indigo-950/10 backdrop-blur sm:p-2">
        <div className="rounded-[1.6rem] bg-linear-to-br from-indigo-950 via-indigo-900 to-cyan-900 px-6 py-8 text-white sm:px-10 sm:py-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
            Team directory
          </p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                People, in one place.
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-6 text-indigo-100">
                A clear view of everyone on your team, designed to feel calm and
                easy to scan.
              </p>
            </div>
            <span className="hidden rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-cyan-100 sm:block">
              {users?.length ?? 0} members
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Directory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Select a person to view their profile.
              </p>
            </div>
            <Link
              href="/users/add"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              <span aria-hidden="true">+</span> Add person
            </Link>
          </div>

          <div className="space-y-3">
            {users?.map((user) => (
              <div
                key={user.id}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3.5 transition hover:border-indigo-100 hover:bg-indigo-50/50 hover:shadow-md hover:shadow-indigo-950/5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-indigo-500 to-cyan-500 text-sm font-bold text-white">
                    {user.name.charAt(0)}
                    {user.surname.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {user.name} {user.surname}
                    </p>
                    <p className="mt-0.5 text-xs capitalize text-slate-500">
                      {user.gender}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/users/${user.id}/edit`}
                  className="inline-flex shrink-0 items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition group-hover:border-indigo-200 group-hover:text-indigo-700 hover:bg-indigo-50"
                >
                  Edit{" "}
                  <span className="ml-1.5" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
