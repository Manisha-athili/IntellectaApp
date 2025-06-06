// src/components/PromptForm.jsx
import { useState, useEffect } from "react";

export default function PromptForm({
  initialData = {},
  onSubmit,
  submitLabel = "Submit Prompt",
  maxCategories = 5,
}) {
  //
  // initialData can look like:
  // {
  //   title: "…",
  //   description: "…",
  //   systemPrompt: "…",
  //   userMessages: ["…", "…"],
  //   assistantMessages: ["…", "…"],
  //   categories: ["Business", "Writing"],
  //   isPrivate: true/false
  // }
  //

  // ─────── Form state ───────
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  // Internally we keep a single conversation array of { role, content }
  const [conversation, setConversation] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ─────── Predefined categories (you can customize this list) ───────
  const predefinedCategories = [
    "Business",
    "RepoPrompt",
    "Writing",
    "Programming",
    "Marketing",
    "Design",
    "Productivity",
    "Cursor Rules",
    "MetaPrompting",
    "Personal Growth",
    "Deep Research",
    "Veo 3",
  ];

  // ─────── Populate “initialData” into local state on mount (or when prop changes) ───────
  useEffect(() => {
    if (initialData.title) setTitle(initialData.title);
    if (initialData.description) setDescription(initialData.description);
    if (initialData.systemPrompt) setSystemPrompt(initialData.systemPrompt);
    if (Array.isArray(initialData.categories))
      setCategories(initialData.categories.slice(0, maxCategories));
    if (typeof initialData.isPrivate === "boolean")
      setIsPrivate(initialData.isPrivate);

    // Build conversation array from userMessages & assistantMessages
    const combined = [];
    if (Array.isArray(initialData.userMessages)) {
      initialData.userMessages.forEach((text) => {
        combined.push({ role: "user", content: text });
      });
    }
    if (Array.isArray(initialData.assistantMessages)) {
      initialData.assistantMessages.forEach((text) => {
        combined.push({ role: "assistant", content: text });
      });
    }
    setConversation(combined);
  }, [initialData, maxCategories]);

  // ─────── Handlers ───────
  const handleAddMessage = (role) => {
    setConversation((prev) => [...prev, { role, content: "" }]);
  };

  const handleMessageChange = (index, value) => {
    setConversation((prev) => {
      const copy = [...prev];
      copy[index].content = value;
      return copy;
    });
  };

  const handleCategoryToggle = (cat) => {
    setCategories((prev) => {
      if (prev.includes(cat)) {
        return prev.filter((c) => c !== cat);
      } else if (prev.length < maxCategories) {
        return [...prev, cat];
      }
      return prev; // already at max
    });
  };

  const handleCategoryAdd = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => {
        if (prev.length >= maxCategories) return prev;
        return [...prev, trimmed];
      });
      setNewCategory("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Basic front-end validation
    if (!title.trim() || !description.trim() || !systemPrompt.trim()) {
      setErrorMessage("Title, description, and system prompt are required.");
      return;
    }

    // Split conversation into two arrays
    const userMessages = conversation
      .filter((m) => m.role === "user" && m.content.trim() !== "")
      .map((m) => m.content.trim());

    const assistantMessages = conversation
      .filter((m) => m.role === "assistant" && m.content.trim() !== "")
      .map((m) => m.content.trim());

    // Build the final payload
    const payload = {
      title: title.trim(),
      description: description.trim(),
      systemPrompt: systemPrompt.trim(),
      userMessages,
      assistantMessages,
      categories,
      isPrivate,
    };

    // Call the parent-supplied onSubmit()
    if (typeof onSubmit === "function") {
      onSubmit(payload);
    }
  };

  // ─────── JSX ───────
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="bg-red-700 text-white p-2 rounded">{errorMessage}</div>
      )}

      {/* Title */}
      <div>
        <label className="block font-semibold text-white">Title *</label>
        <input
          type="text"
          className="w-full mt-1 p-2 bg-zinc-800 border border-zinc-700 text-white rounded"
          placeholder="Give your prompt a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold text-white">Description *</label>
        <textarea
          className="w-full mt-1 p-2 bg-zinc-800 border border-zinc-700 text-white rounded"
          placeholder="Describe what your prompt does and how it should be used"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Prompt Area */}
      <div>
        <label className="block font-semibold text-white mb-1">Prompt *</label>
        <div className="bg-zinc-800 border border-zinc-700 rounded p-3 space-y-4">
          {/* System Prompt */}
          <div>
            <span className="text-sm font-bold text-purple-400">
              SYSTEM PROMPT
            </span>
            <textarea
              className="w-full mt-1 p-2 bg-zinc-900 border border-zinc-700 text-white rounded"
              placeholder="Enter your system prompt here..."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              required
            />
          </div>

          {/* Conversation */}
          <div>
            <span className="text-sm font-bold text-purple-400">
              CONVERSATION
            </span>
            {conversation.map((msg, idx) => (
              <div key={idx} className="mt-2">
                <label className="text-sm block text-white">
                  {msg.role === "user" ? "User Message" : "Assistant Message"}
                </label>
                <textarea
                  className="w-full mt-1 p-2 bg-zinc-900 border border-zinc-700 text-white rounded"
                  value={msg.content}
                  onChange={(e) =>
                    handleMessageChange(idx, e.target.value)
                  }
                />
              </div>
            ))}
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => handleAddMessage("user")}
                className="px-3 py-1 bg-blue-700 text-white rounded"
              >
                + Add User Message
              </button>
              <button
                type="button"
                onClick={() => handleAddMessage("assistant")}
                className="px-3 py-1 bg-purple-700 text-white rounded"
              >
                + Add Assistant Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="block font-semibold text-white">Categories</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {predefinedCategories.map((cat) => (
            <span
              key={cat}
              onClick={() => handleCategoryToggle(cat)}
              className={`cursor-pointer px-3 py-1 rounded-full text-sm border ${
                categories.includes(cat)
                  ? "bg-purple-600 border-purple-700 text-white"
                  : "bg-zinc-700 border-zinc-600 text-zinc-200"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="flex mt-3 gap-2">
          <input
            type="text"
            placeholder="Add or type and Enter to create a category"
            className="flex-1 p-2 bg-zinc-800 border border-zinc-700 text-white rounded"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleCategoryAdd();
              }
            }}
          />
          <button
            type="button"
            onClick={handleCategoryAdd}
            className="bg-zinc-700 px-4 rounded text-white"
          >
            Add
          </button>
        </div>
        <p className="text-sm text-zinc-400 mt-1">
          Choose up to {maxCategories} categories, or add a new one.
        </p>
      </div>

      {/* Private Toggle */}
      <div className="mt-4">
        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate((prev) => !prev)}
            className="accent-purple-500"
          />
          Make this prompt private
        </label>
        <p className="text-sm text-zinc-400 mt-1">
          Private prompts are available with a Basic subscription or higher.
        </p>
      </div>

      {/* Advanced Model Settings (optional) */}
      <details className="mt-4">
        <summary className="cursor-pointer text-purple-400">
          Advanced Model Settings (Optional)
        </summary>
        {/* Expand with sliders, temperature, max tokens, etc. */}
        <p className="text-zinc-500 text-sm mt-2">Coming soon…</p>
      </details>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 w-full bg-white text-black py-2 font-semibold rounded"
      >
        {submitLabel}
      </button>
    </form>
  );
}
