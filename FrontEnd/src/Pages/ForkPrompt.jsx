import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PromptForm from "../Components/PromptForm";
import { getPromptById, forkPrompt } from "../services/PromptService";

export default function ForkPrompt() {
  console.log("hi")
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const data = await getPromptById(id);
        setInitialData({
          title: `${data.title} forked`,
          description: data.description,
          systemPrompt: data.systemPrompt,
          userMessages: data.userMessages,
          assistantMessages: data.assistantMessages,
          categories: data.categories,
          isPrivate: false,
        });
      } catch (err) {
        console.error("Failed to load original prompt:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [id]);

  // 2. Handle fork form submission
  const handleForkSubmit = async (formData) => {
    try {
      const userId = "your_user_id_here"; // TODO: replace with actual user ID (via context/auth)
      const newPrompt = await forkPrompt(id, { ...formData, userId });
      navigate(`/prompt/${newPrompt._id}`);
    } catch (err) {
      console.error("Failed to fork prompt:", err);
    }
  };

  if (loading) return <div className="text-center text-white py-10">Loading…</div>;
  if (!initialData) return <div className="text-red-500 text-center">Prompt not found.</div>;
  console.log(initialData)
  return (
    <div className="max-w-3xl mx-auto mt-8 px-4">
      <PromptForm
        initialData={initialData}
        onSubmit={handleForkSubmit}
        submitLabel="Fork Prompt"
      />
    </div>
  );
}
