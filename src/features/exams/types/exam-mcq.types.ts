// src/features/exams/types/exam-mcq.types.ts

export interface ExamMcq {
  id: string;

  examId: string;

  mcqId: string;

  orderNo: number;

  mark: string;

  createdAt: string;

  mcq: {
    id: string;

    question: {
      text: string;
      image: string | null;
    };

    type: string;
  };
}