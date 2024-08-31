import mongoose from "mongoose";

export interface ISettings extends mongoose.Document {
  phoneNumber: string;
  email: string;
  address: string;
  facebook: string;
  twitter: string;
  instagram: string;
  company: {
    name: string;
    description: string;
    logo: string;
  };
}

const SettingsSchema = new mongoose.Schema<ISettings>({
  phoneNumber: {
    type: String,
    required: [true, "Please provide a phone number."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email."],
  },
  address: {
    type: String,
    required: [true, "Please provide an address."],
  },
  facebook: {
    type: String,
    required: [true, "Please provide a facebook link."],
  },
  twitter: {
    type: String,
    required: [true, "Please provide a twitter link."],
  },
  instagram: {
    type: String,
    required: [true, "Please provide an instagram link."],
  },
  company: {
    name: {
      type: String,
      required: [true, "Please provide a company name."],
    },
    description: {
      type: String,
      required: [true, "Please provide a company description."],
    },
    logo: {
      type: String,
      required: [true, "Please provide a company logo."],
    },
  },
});

export default mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema);
