import { connectToDB } from "@/lib/db";
import Lead from "@/models/Lead";

export default async function AdminPage() {
  await connectToDB();
  const leads = await Lead.find().sort({ createdAt: -1 });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Leads cadastrados</h1>
      <div className="space-y-4">
        {leads.map((lead: any) => (
          <div key={lead._id} className="border p-4 rounded shadow">
            <p>
              <strong>Nome:</strong> {lead.fullName}
            </p>
            <p>
              <strong>CPF:</strong> {lead.cpf}
            </p>
            <p>
              <strong>Rua:</strong> {lead.street}
            </p>
            <p>
              <strong>Número:</strong> {lead.number}
            </p>
            <p>
              <strong>Bairro:</strong> {lead.neighborhood}
            </p>
            <p>
              <strong>Complemento:</strong> {lead.complement}
            </p>
            <p>
              <strong>Cidade:</strong> {lead.city}
            </p>
            <p>
              <strong>Estado:</strong> {lead.state}
            </p>
            <p>
              <strong>Telefone:</strong> {lead.phone}
            </p>
            <p>
              <strong>Email:</strong> {lead.email}
            </p>
            <p>
              <strong>Data:</strong> {new Date(lead.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
