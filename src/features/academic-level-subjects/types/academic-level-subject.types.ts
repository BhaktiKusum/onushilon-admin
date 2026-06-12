export interface AcademicLevelSubject {
  
  id: string;

  academicLevelId: string;

  subjectId: string;

  subject: {
    id: string;

    name: string;

    adminDisplayName: string;
  };
}