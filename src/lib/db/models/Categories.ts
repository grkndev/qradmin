import mongoose from "mongoose";

export interface Categories extends mongoose.Document {
  categoryId: string;
  name: string;
  image: string;
  slug: string;
  createdAt: Date;
}

const Categories = new mongoose.Schema<Categories>({
  categoryId: {
    type: String,
    required: [true, "Please provide a Category ID."],
  },
  name: {
    type: String,
    required: [true, "Please provide a name."],
  },
  image: {
    type: String,
    required: [true, "Please provide an Image"],
  },
  slug: {
    type: String,
    required: [true, "Please provide a Slug"],
  },
  createdAt: {
    default: Date.now,
    type: Date,
  },
});
export default mongoose.models.Categories ||
  mongoose.model<Categories>("Categories", Categories);
