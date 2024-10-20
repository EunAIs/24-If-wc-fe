"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/State">State</Link>
        </li>
        <li>
          <Link href="/Quiz">Quiz</Link>
        </li>
      </ul>
    </nav>
  );
}
