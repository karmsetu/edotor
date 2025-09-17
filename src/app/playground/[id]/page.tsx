"use client";
import { useParams } from "next/navigation";

export default function PlaygroundPage() {
  const { id } = useParams<{ id: string }>();
  return <div>{id}</div>;
}
