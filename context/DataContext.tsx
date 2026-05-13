'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Course {
  id: string;
  title: string;
  age: string;
  description: string;
  duration: string;
  icon: string;
  color: string;
}

export interface Teacher {
  id: string;
  name: string;
  position: string;
  experience: string;
  education: string;
  bio: string;
  image: string;
  phone?: string;
  email?: string;
}

export interface Student {
  id: string;
  name: string;
  course: string;
  image: string;
  achievement?: string;
  avatar?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  age: string;
  course: string;
  status: 'new' | 'contacted' | 'enrolled';
  createdAt: Date;
}

export interface Review {
  id: string;
  name: string;
  review: string;
  rating: number;
  createdAt: Date;
}

interface DataContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  updateCourse: (id: string, course: Omit<Course, 'id'>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => Promise<void>;
  updateTeacher: (id: string, teacher: Omit<Teacher, 'id'>) => Promise<void>;
  deleteTeacher: (id: string) => Promise<void>;
  
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  updateStudent: (id: string, student: Omit<Student, 'id'>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  updateLeadStatus: (id: string, status: Lead['status']) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;

  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => Promise<string | null>;
  deleteReview: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!db) {
      return;
    }

    const unsubscribeCourses = onSnapshot(collection(db, 'courses'), (snapshot) => {
      setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Course[]);
    });

    const unsubscribeTeachers = onSnapshot(collection(db, 'teachers'), (snapshot) => {
      setTeachers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Teacher[]);
    });

    const unsubscribeStudents = onSnapshot(collection(db, 'students'), (snapshot) => {
      setStudents(snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          image: data.image || data.avatar || '',
        };
      }) as Student[]);
    });

    const leadsQuery = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribeLeads = onSnapshot(leadsQuery, (snapshot) => {
      setLeads(snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
        };
      }) as Lead[]);
    });

    const reviewsQuery = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribeReviews = onSnapshot(reviewsQuery, (snapshot) => {
      setReviews(snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(),
        };
      }) as Review[]);
    });

    return () => {
      unsubscribeCourses();
      unsubscribeTeachers();
      unsubscribeStudents();
      unsubscribeLeads();
      unsubscribeReviews();
    };
  }, []);

  // Course CRUD
  const addCourse = async (course: Omit<Course, 'id'>) => {
    if (!db) return;
    await addDoc(collection(db, 'courses'), course);
  };

  const updateCourse = async (id: string, course: Omit<Course, 'id'>) => {
    if (!db) return;
    await updateDoc(doc(db, 'courses', id), course);
  };

  const deleteCourse = async (id: string) => {
    if (!db) return;
    await deleteDoc(doc(db, 'courses', id));
  };

  // Teacher CRUD
  const addTeacher = async (teacher: Omit<Teacher, 'id'>) => {
    if (!db) return;
    await addDoc(collection(db, 'teachers'), teacher);
  };

  const updateTeacher = async (id: string, teacher: Omit<Teacher, 'id'>) => {
    if (!db) return;
    await updateDoc(doc(db, 'teachers', id), teacher);
  };

  const deleteTeacher = async (id: string) => {
    if (!db) return;
    await deleteDoc(doc(db, 'teachers', id));
  };

  // Student CRUD
  const addStudent = async (student: Omit<Student, 'id'>) => {
    if (!db) return;
    await addDoc(collection(db, 'students'), student);
  };

  const updateStudent = async (id: string, student: Omit<Student, 'id'>) => {
    if (!db) return;
    await updateDoc(doc(db, 'students', id), student);
  };

  const deleteStudent = async (id: string) => {
    if (!db) return;
    await deleteDoc(doc(db, 'students', id));
  };

  // Lead CRUD
  const addLead = async (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    if (!db) return;
    await addDoc(collection(db, 'leads'), {
      ...lead,
      status: 'new',
      createdAt: Timestamp.now(),
    });
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    if (!db) return;
    await updateDoc(doc(db, 'leads', id), { status });
  };

  const deleteLead = async (id: string) => {
    if (!db) return;
    await deleteDoc(doc(db, 'leads', id));
  };

  const addReview = async (review: Omit<Review, 'id' | 'createdAt'>) => {
    if (!db) return null;
    const ref = await addDoc(collection(db, 'reviews'), {
      ...review,
      createdAt: Timestamp.now(),
    });
    return ref.id;
  };

  const deleteReview = async (id: string) => {
    if (!db) return;
    await deleteDoc(doc(db, 'reviews', id));
  };

  return (
    <DataContext.Provider value={{
      courses, addCourse, updateCourse, deleteCourse,
      teachers, addTeacher, updateTeacher, deleteTeacher,
      students, addStudent, updateStudent, deleteStudent,
      leads, addLead, updateLeadStatus, deleteLead,
      reviews, addReview, deleteReview,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
