"use client";
export const dynamic = "force-dynamic";
import { connectToDB } from "@/lib/db";
import Lead from "@/models/Lead";

export default async function AdminPage() {
  await connectToDB();
  const leads = await Lead.find().sort({ createdAt: 1 }); // do mais antigo para o mais recente

  return (
    <html lang="pt-BR">
      <body className="bg-white text-black min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-6">Leads cadastrados</h1>

        <div className="mb-4">
          <button
            onClick={() => {
              const csvContent = [
                [
                  "#",
                  "Nome",
                  "CPF",
                  "Email",
                  "Telefone",
                  "Rua",
                  "Número",
                  "Bairro",
                  "Complemento",
                  "Cidade",
                  "Estado",
                  "Data",
                ].join(","),
              ];

              leads.forEach((lead: any, index: number) => {
                csvContent.push(
                  [
                    index + 1,
                    lead.fullName || "",
                    lead.cpf || "",
                    lead.email || "",
                    lead.phone || "",
                    lead.street || "",
                    lead.number || "",
                    lead.neighborhood || "",
                    lead.complement || "",
                    lead.city || "",
                    lead.state || "",
                    lead.createdAt
                      ? new Date(lead.createdAt).toLocaleString("pt-BR")
                      : "",
                  ].join(",")
                );
              });

              const blob = new Blob([csvContent.join("\n")], {
                type: "text/csv;charset=utf-8;",
              });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.setAttribute("href", url);
              link.setAttribute("download", "leads.csv");
              link.click();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Exportar CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="p-3 border border-gray-300 text-left">#</th>
                <th className="p-3 border border-gray-300 text-left">Nome</th>
                <th className="p-3 border border-gray-300 text-left">CPF</th>
                <th className="p-3 border border-gray-300 text-left">Email</th>
                <th className="p-3 border border-gray-300 text-left">
                  Telefone
                </th>
                <th className="p-3 border border-gray-300 text-left">
                  Endereço
                </th>
                <th className="p-3 border border-gray-300 text-left">Cidade</th>
                <th className="p-3 border border-gray-300 text-left">Estado</th>
                <th className="p-3 border border-gray-300 text-left">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white text-black">
              {leads.map((lead: any, index: number) => (
                <tr key={lead._id} className="hover:bg-gray-100">
                  <td className="p-3 border border-gray-300">{index + 1}</td>
                  <td className="p-3 border border-gray-300">
                    {lead.fullName || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {lead.cpf || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {lead.email || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {lead.phone || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {[
                      lead.street,
                      lead.number,
                      lead.neighborhood,
                      lead.complement,
                    ]
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {lead.city || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {lead.state || "-"}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {lead.createdAt
                      ? new Date(lead.createdAt).toLocaleString("pt-BR")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );
}
