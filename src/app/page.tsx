"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    fullName: "",
    cpf: "",
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    complement: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        street: data.logradouro || "",
        neighborhood: data.bairro || "",
        city: data.localidade || "",
        state: data.uf || "",
      }));
    } catch (error) {
      alert("Erro ao buscar CEP");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      alert("Enviado com sucesso!");
      setFormData({
        fullName: "",
        cpf: "",
        cep: "",
        street: "",
        number: "",
        neighborhood: "",
        complement: "",
        city: "",
        state: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      alert("Erro ao enviar");
    }
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4 bg-white text-black min-h-screen">
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

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-8"
        method="POST"
      >
        {[
          { name: "fullName", placeholder: "Nome completo" },
          { name: "cpf", placeholder: "CPF" },
          { name: "cep", placeholder: "CEP", onBlur: handleCepBlur },
          { name: "street", placeholder: "Rua" },
          { name: "number", placeholder: "Número" },
          { name: "neighborhood", placeholder: "Bairro" },
          { name: "complement", placeholder: "Complemento" },
          { name: "city", placeholder: "Cidade" },
          { name: "state", placeholder: "Estado" },
          { name: "phone", placeholder: "Telefone" },
          { name: "email", placeholder: "Email" },
        ].map((field) => (
          <input
            key={field.name}
            type="text"
            name={field.name}
            placeholder={field.placeholder}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            onBlur={(field as any).onBlur}
            className="w-full rounded border border-black bg-white px-4 py-2 text-black mb-2"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}
