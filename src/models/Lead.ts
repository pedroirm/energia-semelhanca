import mongoose, { Document, Schema } from "mongoose";

interface ILead extends Document {
  fullName: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  city: string;
  state: string;
  phone: string;
  email: string;
}

const LeadSchema = new Schema<ILead>(
  {
    fullName: String,
    cpf: String,
    cep: String,
    street: String,
    number: String,
    neighborhood: String,
    complement: String,
    city: String,
    state: String,
    phone: String,
    email: String,
  },
  { timestamps: true } // 👈 adiciona createdAt e updatedAt
);

export default mongoose.models.Lead ||
  mongoose.model<ILead>("Lead", LeadSchema);
