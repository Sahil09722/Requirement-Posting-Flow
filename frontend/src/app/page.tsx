import { RequirementForm } from "@/components/requirement/RequirementForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Post a Requirement</h1>
        <p className="mt-4 text-lg text-gray-500">
          Tell us about your event and we'll help you find the right professionals.
        </p>
      </div>
      <RequirementForm />
    </main>
  );
}
