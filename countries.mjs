import mongoose from "mongoose";

const country = mongoose.Schema({
  countryName: String,
});

const countries = mongoose.model("Countries", country);

export default countries;
