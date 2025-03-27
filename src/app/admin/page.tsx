import { connectToDB } from "@/lib/db";
import Lead from "@/models/Lead";

export default async function AdminPage() {
  await connectToDB();
  const leads = await Lead.find().sort({ createdAt: -1 });

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-6">Leads cadastrados</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3 border border-gray-700 text-left">Nome</th>
                <th className="p-3 border border-gray-700 text-left">CPF</th>
                <th className="p-3 border border-gray-700 text-left">Email</th>
                <th className="p-3 border border-gray-700 text-left">
                  Telefone
                </th>
                <th className="p-3 border border-gray-700 text-left">
                  Endereço
                </th>
                <th className="p-3 border border-gray-700 text-left">Cidade</th>
                <th className="p-3 border border-gray-700 text-left">Estado</th>
                <th className="p-3 border border-gray-700 text-left">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 bg-gray-900 text-white">
              {leads.map((lead: any) => (
                <tr key={lead._id} className="hover:bg-gray-800">
                  <td className="p-3 border border-gray-700">
                    {lead.fullName || "-"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {lead.cpf || "-"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {lead.email || "-"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {lead.phone || "-"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {[
                      lead.street,
                      lead.number,
                      lead.neighborhood,
                      lead.complement,
                    ]
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {lead.city || "-"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {lead.state || "-"}
                  </td>
                  <td className="p-3 border border-gray-700">
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
