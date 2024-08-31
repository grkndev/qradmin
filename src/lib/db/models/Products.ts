import mongoose from "mongoose";

export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  image: string;
  parent: string;
  price: string;
  createdAt: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: [true, "Please provide a name."],
  },
  description: {
    type: String,
    required: [true, "Please provide a Phone description."],
  },
  image: {
    type: String,
    required: [true, "Please provide an Image"],
  },
  parent: {
    type: String,
    required: [true, "Please provide a Parent"],
  },
  price: {
    type: String,
    required: [true, "Please provide a Price"],
  },
  createdAt: {
    type: Date,
    required: [true, "Please provide a Date."],
  },
});

export default mongoose.models.Products ||
  mongoose.model<IProduct>("Products", ProductSchema);
