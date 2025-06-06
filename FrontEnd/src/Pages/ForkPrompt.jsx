// src/pages/Page_ForkPrompt.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PromptForm from "../Components/PromptForm";

export default function ForkPrompt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1) Fetch original prompt data
  useEffect(() => {
    async function loadPrompt() {
      try {
        
        const resp = await fetch(`/api/prompts/${id}`, {
          credentials: "include",
        });
        // console.log(resp.body)
         const data = await resp.json();

        if (!resp.ok) throw new Error("Failed to fetch prompt");
       
        // We want to prefill the form, but clear out any “private” or ID fields.
        const forkData = {
          title: data.title + " (Forked)",
          description: data.description,
          systemPrompt: data.systemPrompt,
          userMessages: data.userMessages,
          assistantMessages: data.assistantMessages,
          categories: data.categories,
          isPrivate: false,
        };
        setInitialData(forkData);
      } catch (err) {
        console.error(err,"eroe");
      } finally {
        setLoading(false);
      }
    }
    loadPrompt();
  }, [id]);

  // 2) On submit, we do a “POST” to create a brand-new prompt (just like “create”)
  const handleFork = async (formData) => {
    try {
      const resp = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!resp.ok) {
        const body = await resp.json();
        throw new Error(body.error || "Failed to fork prompt");
      }
      const newPrompt = await resp.json();
      navigate(`/prompt/${newPrompt._id}`);
    } catch (err) {
      console.error("ForkPrompt error:", err);
    }
  };

  if (loading)
    return <div className="text-center text-white py-10">Loading…</div>;
  if (!initialData)
    return <div className="text-red-500">Original prompt not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <PromptForm
        initialData={initialData}
        onSubmit={handleFork}
        submitLabel="Fork Prompt"
      />
    </div>
  );
}
