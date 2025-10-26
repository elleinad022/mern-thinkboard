import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  console.log({ id });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);

        toast.error("Failed to fetch the note");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note.");
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setIsSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      toast.error("Failed to update note");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center bg-center">
        <LoaderIcon className="animate-bounce size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to notes
            </Link>
            <button
              className="btn btn-error btn-outline"
              onClick={handleDelete}>
              <Trash2Icon className="size-5" />
              Delete note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control space-y-2">
                <label className="label">
                  <span className="text-sm font-medium text-content-600">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered w-full rounded-xl"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control space-y-2">
                <label className="label">
                  <span className="text-sm font-medium text-content-600">
                    Content
                  </span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered w-full h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={isSaving}
                  onClick={handleSave}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
