export type ExamType =
  | "LIVE"
  | "PRACTICE";

export type EnrollmentType =
  | "OPEN"
  | "PRIVATE";

export interface Exam {
  id: string;

  title: string;

  description: string;

  academicLevelId: string;

  type: ExamType;

  enrollmentType: EnrollmentType;

  durationMinutes: number;

  totalMarks: number;

  negativeMarks: number;

  startAt: string;

  endAt: string;

  maxParticipants: number;

  orderNo: number;

  isPublished: boolean;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}