import React from "react";
import Main from "@/components/Main";
import Participants from "../components/Participants";


export default function Home() {
  return (
    <div>
      <Main />
      <Participants heading="skilled-worker" title="Skilled Worker" order="newest" result="5" />
      <Participants heading="employer" title="Employer" order="newest" result="5" />
    </div>
  );
}
