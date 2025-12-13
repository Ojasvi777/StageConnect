"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";
import { createExperience, updateExperience } from "../Actions/profile";
import { useRouter } from "next/navigation";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experience?: any;
}

export default function ExperienceModal({ isOpen, onClose, userId, experience }: ExperienceModalProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: experience?.title || "",
    companyName: experience?.company_name || "",
    projectName: experience?.project_name || "",
    location: experience?.location || "",
    startDate: experience?.start_date ? new Date(experience.start_date).toISOString().split('T')[0] : "",
    endDate: experience?.end_date ? new Date(experience.end_date).toISOString().split('T')[0] : "",
    description: experience?.description || "",
    isCurrent: !experience?.end_date,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const data = {
        title: formData.title,
        companyName: formData.companyName,
        projectName: formData.projectName,
        location: formData.location,
        startDate: new Date(formData.startDate),
        endDate: formData.isCurrent ? undefined : new Date(formData.endDate),
        description: formData.description,
      };

      let result;
      if (experience) {
        // Update existing
        result = await updateExperience(experience.experience_id, data);
      } else {
        // Create new
        result = await createExperience(userId, data);
      }

      if (result.success) {
        router.refresh();
        onClose();
      } else {
        setError(result.error || "Failed to save experience");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error("Error saving experience:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#F3E6C9] p-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-[#D4AF37]">
            {experience ? "Edit Experience" : "Add Experience"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#6B6B6B] hover:text-[#2E2E2E] transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
              Title / Role *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              placeholder="e.g., Lead Singer, Backup Dancer"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="Production house, band name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="Movie, show, concert name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              placeholder="City, Country"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
                Start Date *
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={formData.isCurrent}
                className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-[#6B6B6B]">
              <input
                type="checkbox"
                name="isCurrent"
                checked={formData.isCurrent}
                onChange={handleChange}
                className="w-4 h-4 accent-[#D4AF37] rounded"
              />
              I currently work here
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#6B6B6B] mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-[#F3E6C9] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none"
              placeholder="Describe your role, achievements, and responsibilities..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#B8941F] transition disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Experience
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="bg-white border border-[#D4AF37] text-[#D4AF37] px-6 py-2 rounded-lg font-semibold hover:bg-[#FFF8E7] transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
