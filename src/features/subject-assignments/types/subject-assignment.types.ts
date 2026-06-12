export interface SubjectAssignment {
  id: string;
  academicLevelId: string;
  subjectId: string;

  subject: {
    id: string;
    name: string;
    adminDisplayName: string;
    isActive: boolean;
  };

  academicLevel: {
    id: string;
    name: string;
  };
}

export interface GroupedSubjectAssignment {
  subjectId: string;

  subjectName: string;

  adminDisplayName: string;

  assignmentIds: string[];

  academicLevels: {
    id: string;
    name: string;
  }[];
}

export interface CreateSubjectAssignmentPayload {
  name: string;
  adminDisplayName: string;
  academicLevelIds: string[];
}


