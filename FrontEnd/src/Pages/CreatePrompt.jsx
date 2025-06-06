// src/pages/Page_CreatePrompt.jsx
import PromptForm from "../Components/PromptForm";
import { useNavigate } from "react-router-dom";

export default function CreatePrompt() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      const resp = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!resp.ok) {
        const body = await resp.json();
        throw new Error(body.error || "Failed to create prompt");
      }
      const newPrompt = await resp.json();
      navigate(`/prompt/${newPrompt._id}`);
    } catch (err) {
      console.error("CreatePrompt error:", err);
      // You could show a toast or something here
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <PromptForm onSubmit={handleCreate} submitLabel="Submit Prompt" />
    </div>
  );
}
