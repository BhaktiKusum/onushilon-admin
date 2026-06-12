"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useExam } from "../hooks/use-exam";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { usePublishExam } from "../hooks/use-publish-exam";
import { useUnpublishExam } from "../hooks/use-unpublish-exam";
import { useDeleteExam } from "../hooks/use-delete-exam";

interface Props {
  examId: string;
}

export default function ExamDetails({ examId }: Props) {
  const { data: exam, isLoading } = useExam(examId);

  const router = useRouter();

  const publishMutation = usePublishExam();

  const unpublishMutation = useUnpublishExam();

  const deleteMutation = useDeleteExam();

  const handlePublish = () => {
    publishMutation.mutate(examId, {
      onSuccess: () => {
        toast.success("Exam published");
      },
    });
  };

  const handleUnpublish = () => {
    unpublishMutation.mutate(examId, {
      onSuccess: () => {
        toast.success("Exam unpublished");
      },
    });
  };

  const handleDelete = () => {
    if (!confirm("Delete this exam?")) {
      return;
    }

    deleteMutation.mutate(examId, {
      onSuccess: () => {
        toast.success("Exam deleted");

        router.push("/exams");
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!exam) {
    return <div>Exam not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{exam.title}</h1>

        <p className="text-muted-foreground">{exam.description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <p className="text-sm text-muted-foreground">Type</p>

          <p>{exam.type}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Duration</p>

          <p>{exam.durationMinutes} min</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Total Marks</p>

          <p>{exam.totalMarks}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Published</p>

          <p>{exam.isPublished ? "Yes" : "No"}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href={`/exams/${examId}/subjects`}>
          <Button>Subjects</Button>
        </Link>

        <Link href={`/exams/${examId}/mcqs`}>
          <Button variant="outline">MCQs</Button>
        </Link>

        {exam.isPublished ? (
          <Button variant="secondary" onClick={handleUnpublish}>
            Unpublish
          </Button>
        ) : (
          <Button onClick={handlePublish}>Publish</Button>
        )}

        <Link href={`/exams/${examId}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>

        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
