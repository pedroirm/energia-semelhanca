export const runtime = "edge";
("use client");
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    fullName: "",
    cpf: "",
    street: "",
    number: "",
    neighborhood: "",
    complement: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  });

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("/lead", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setSuccess(true);
    setForm({
      fullName: "",
      cpf: "",
      street: "",
      number: "",
      neighborhood: "",
      complement: "",
      city: "",
      state: "",
      phone: "",
      email: "",
    });
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <Image
        src="/logo.png"
        alt="Logo"
        width={500}
        height={150}
        className="mx-auto"
      />
      <h1 className="text-3xl font-bold text-center mt-6">
        Energia & Semelhança
      </h1>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Apresentação do Projeto de Palestra: “Energia e Semelhança”
      </h2>

      <p className="text-justify leading-relaxed mt-4">
        O projeto de palestra intitulado “Energia e Semelhança” será ministrado
        por Bim da Ambulância, um homem que desempenha diversos papéis em sua
        vida: Filho, Pai, Marido, Empreendedor, Administrador, Piloto e Deputado
        Estadual. Nessa palestra, Bim compartilhará sua trajetória de vida,
        repleta de desafios e conquistas, até alcançar a realização pessoal e
        profissional que vive hoje.
      </p>

      <p className="text-justify leading-relaxed mt-4">
        Ao longo de sua apresentação, Bim fará uma reflexão sobre suas
        experiências, abordando como cada fase de sua vida o moldou e o ajudou a
        encontrar seu propósito. Ele falará sobre o impacto da energia que
        coloca em cada ação e a semelhança entre os desafios enfrentados ao
        longo de sua jornada, sempre com foco na superação e no crescimento.
      </p>

      <p className="text-justify leading-relaxed mt-4">
        Com um olhar profundo sobre os aspectos familiares, empreendedores e
        políticos de sua vida, Bim mostrará como os valores de perseverança,
        resiliência e dedicação foram fundamentais para se tornar o homem
        realizado que é hoje. Esta palestra será uma oportunidade única de
        entender como a união desses elementos pode levar à transformação
        pessoal e ao sucesso.
      </p>

      <p className="text-justify leading-relaxed mt-4">
        A apresentação de “Energia e Semelhança” é uma poderosa reflexão sobre o
        poder da perseverança e da energia vital que nos impulsiona em nossa
        caminhada, destacando a importância de se manter fiel aos próprios
        valores e sempre buscar evoluir, independentemente das adversidades.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          placeholder="Nome completo"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="CPF"
          value={form.cpf}
          onChange={(e) => setForm({ ...form, cpf: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Rua"
          value={form.street}
          onChange={(e) => setForm({ ...form, street: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Número"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Bairro"
          value={form.neighborhood}
          onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Complemento"
          value={form.complement}
          onChange={(e) => setForm({ ...form, complement: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Cidade"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Estado"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Telefone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded w-full"
        >
          Enviar
        </button>

        {success && (
          <p className="text-green-600 text-center">
            Lead cadastrado com sucesso!
          </p>
        )}
      </form>
    </main>
  );
}
