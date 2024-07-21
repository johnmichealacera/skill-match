import React from "react";
import Main from "@/components/Main";
import Books from "@/components/Books";
import Hashtag from "@/components/Hastag";

export default function Home() {
  return (
    <div>
      <Main />
      <Books heading="skilled-worker" title="Skilled Worker" order="newest" result="5" />
      <Books heading="employer" title="Employer" order="newest" result="5" />
      {/* <Hashtag /> */}
    </div>
  );
}
