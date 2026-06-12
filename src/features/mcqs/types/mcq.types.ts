export interface McqReference {
  type: string;
  value: string;
}

export interface McqOption {
  key: string;
  text: string | null;
  image: string | null;
}

export interface McqContent {
  text: string | null;
  image: string | null;
}

export interface Mcq {
  id: string;

  subjectId: string;

  chapterId: string;

  topicId: string;

  type: "STANDARD";

  scenario:
    | McqContent
    | null;

  question: McqContent;

  options: McqOption[];

  correctOptionKey: string;

  explanation:
    | McqContent
    | null;

  references:
    McqReference[];

  difficulty:
    | "EASY"
    | "MEDIUM"
    | "HARD";

  isPremium: boolean;

  isActive: boolean;

  subject?: {
    id: string;
    name: string;
    adminDisplayName: string;
  };

  chapter?: {
    id: string;
    name: string;
  };

  topic?: {
    id: string;
    name: string;
  };
}