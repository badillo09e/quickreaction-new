"use client";

import React, { useState } from "react";

export default function Website() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <div style={{background:"#061326", color:"white", height:"100vh", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <h1>🚀 QuickReaction is LIVE 🚀</h1>
    </div>
  );
}
