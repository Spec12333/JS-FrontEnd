"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import type { User } from "@/app/(helpers)/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserForm = Omit<User, "id">;

export default function EditUser() {
  const { id } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserForm>();

  useEffect(() => {
    axios.get(`/api/users/${id}`).then((response) => {
      reset(response.data.user);
    });
  }, []);

  const handleEdit: SubmitHandler<UserForm> = (data) => {
    axios.put(`/api/users/${id}`, data).then(() => {
      router.push("/users");
    });
  };

  const handleDelete = () => {
    axios.delete(`/api/users/${id}`).then(() => {
      router.push("/users");
    });
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 sm:py-12">
      <section className="mx-auto max-w-lg overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl shadow-indigo-950/10 backdrop-blur">
        <div className="bg-linear-to-br from-indigo-950 via-indigo-900 to-cyan-900 px-6 py-8 text-white sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
            Team directory
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Edit teammate
          </h1>
          <p className="mt-2 text-sm leading-6 text-indigo-100">
            Update the details for profile #{id}.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleEdit)}
          className="space-y-5 p-6 sm:p-8"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              First name
            </label>
            {errors.name && (
              <p className="mb-2 text-sm text-rose-600">
                Please enter a first name.
              </p>
            )}
            <input
              id="name"
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="surname"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Last name
            </label>
            {errors.surname && (
              <p className="mb-2 text-sm text-rose-600">
                Please enter a last name.
              </p>
            )}
            <input
              id="surname"
              type="text"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              {...register("surname", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Gender
            </label>
            {errors.gender && (
              <p className="mb-2 text-sm text-rose-600">
                Please choose a gender.
              </p>
            )}
            <select
              id="gender"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              {...register("gender", { required: true })}
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100"
          >
            Save changes
          </button>
          <button
            onClick={() => handleDelete()}
            type="button"
            className="w-full rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100"
          >
            Delete user
          </button>
        </form>
      </section>
      <Link
        href={"/users"}
        className="mx-auto mt-5 flex max-w-lg items-center justify-center rounded-xl border border-indigo-100 bg-white/80 px-4 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-100"
      >
        ← Back to users
      </Link>
    </main>
  );
}
