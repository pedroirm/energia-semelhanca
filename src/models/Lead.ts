import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
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
});

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
