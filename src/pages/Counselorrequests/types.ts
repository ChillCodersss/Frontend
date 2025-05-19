export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  majorTitle: string | null;
  gradeLevel: string | null;
  lastGradeGPA: number;
  schoolName: string | null;
  province: string | null;
  createDate: string | null;
  aboutMe: string | null;
  requestStatus: number;
  picUrl: string | null;
}

export interface Value {
  items: Student[];
  totalPages: number;
  totalItems: number;
}

export interface ApiResponse {
  isSuccess: boolean;
  value: Value;
  error: { message: string } | null;
}

export interface RequestParams {
  PageSize: number;
  PageIndex: number;
  Major?: number | null;
  GradeLevel?: number | null;
  Status?: number;
}

export interface ConfirmDialogState {
  open: boolean;
  action: 'approve' | 'reject' | null;
  studentId: number | null;
}

export interface StudentDetailsDialogProps {
  open: boolean;
  student: Student | null;
  handleClose: () => void;
  handleShowMore: (aboutMe: string | null) => void;
}