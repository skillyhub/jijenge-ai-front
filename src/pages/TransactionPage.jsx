import React from "react";
import Layout from "./Layout";
import { Transactions } from "../components";

function AboutPage() {
  return <Layout children={<Transactions />} />;
}

export default AboutPage;
