import { connectToDB } from "@/lib/db";
import Lead from "@/models/Lead";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    console.log("URI:", process.env.MONGODB_URI);
    const data = await req.json();

    const newLead = await Lead.create({
      fullName: data.fullName,
      cpf: data.cpf,
      cep: data.cep,
      street: data.street,
      number: data.number,
      neighborhood: data.neighborhood,
      complement: data.complement,
      city: data.city,
      state: data.state,
      phone: data.phone,
      email: data.email,
    });
    console.log("Lead criado:", newLead);
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error("Erro ao salvar lead:", error);
    return NextResponse.json(
      { message: "Erro ao salvar lead" },
      { status: 500 }
    );
  }
}
