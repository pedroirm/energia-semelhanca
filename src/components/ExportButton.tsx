"use client";

type Lead = {
  _id: string;
  fullName?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  complement?: string;
  city?: string;
  state?: string;
  createdAt?: string;
};

export default function ExportButton({ leads }: { leads: Lead[] }) {
  const handleExport = () => {
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

    leads.forEach((lead, index) => {
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
  };

  return (
    <button
      onClick={handleExport}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Exportar CSV
    </button>
  );
}
