import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required("Give this item a name for the ledger.")
    .min(3, "Needs at least 3 characters.")
    .max(60, "Keep it to 60 characters or fewer."),
  category: Yup.string().required("Choose a shelf to file this under."),
  price: Yup.number()
    .typeError("Price must be a number.")
    .required("Every item needs a price.")
    .min(0.01, "Price must be more than $0.")
    .max(100000, "That's above our $100,000 ceiling."),
  stock: Yup.number()
    .typeError("Stock must be a number.")
    .required("Enter how many are on the shelf.")
    .integer("Stock must be a whole number.")
    .min(0, "Stock can't be negative.")
    .max(9999, "That's above our 9,999 count ceiling."),
  description: Yup.string()
    .trim()
    .required("Describe the piece for the catalog.")
    .min(20, ({ min, value }) => `Add ${min - value.length} more characters (20 minimum).`)
    .max(300, "Keep the description under 300 characters."),
  image: Yup.string().trim().url("That doesn't look like a valid URL."),
});

export const initialValues = {
  title: "",
  category: "",
  price: "",
  stock: "",
  description: "",
  image: "",
};