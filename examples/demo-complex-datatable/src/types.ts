export interface CourseName {
  coverUrl?: string;
  name: string;
}

export interface Instructor {
  name: string;
  avatarUrl: string;
}

export interface OfflineClassChild {
  avatarUrl: string;
  name: string;
  age: number;
  dateOfBirth: string;
  attendance: string;
  actions: string;
}

export interface OfflineClass {
  childs: OfflineClassChild[];
  id: number;
  courseName: CourseName;
  classDay: string;
  instructors: Instructor[];
  enrolled: number;
  date: string;
  startTime: string;
  endTime: string;
}
