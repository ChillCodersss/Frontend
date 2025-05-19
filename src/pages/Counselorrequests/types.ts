export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  majorTitle: string | null;
  gradeLevel: string | null;
  lastGradeGPA: number;
  schoolName: string | null;
  aboutMe: string | null;
  province: string | null;
  picName: string | null;
  picUrl: string | null;
  requestStatus: number;
  createDate: string | null;
}

export interface Value {
  items: Student[];
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalCount: number;
  filteredCount: number;
}

export interface ApiResponse {
  value: Value;
  isSuccess: boolean;
  isFailure: boolean;
  message: string | null;
  error: { code: string; message: string };
}

export interface RequestParams {
  PageSize: number;
  PageIndex: number;
  Major: number | null;
  GradeLevel: number | null;
  Status?: number;
}

export interface ConfirmDialogState {
  open: boolean;
  action: 'approve' | 'reject' | null;
  studentId: number | null;
}