'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
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
import { auth, db } from '@/lib/firebase';
import { requireSignedIn, stripUndefined } from '@/lib/firestoreAdmin';

export interface Course {
  id: string;
  title: string;
  age: string;
  description: string;
  duration: string;
  icon: string;
  color: string;
  image?: string;
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
  authUser: User | null;
  authLoading: boolean;
  publicDataLoaded: boolean;

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

function requireDb(): NonNullable<typeof db> {
  if (!db) {
    throw new Error('Firebase Firestore конфигурациясы табылган жок.');
  }
  return db;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin') ?? false;
  const [authLoading, setAuthLoading] = useState(false);
  const [publicDataLoaded, setPublicDataLoaded] = useState(true);

  useEffect(() => {
    if (!db) return;
    const firestore = db;

    const readyTimeout = window.setTimeout(() => setPublicDataLoaded(true), 1500);

    const unsubscribeCourses = onSnapshot(collection(firestore, 'courses'), (snapshot) => {
      setCourses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Course[]);
      setPublicDataLoaded(true);
    }, (error) => {
      console.error('Failed to subscribe to courses:', error);
      setPublicDataLoaded(true);
    });

    const unsubscribeTeachers = onSnapshot(collection(firestore, 'teachers'), (snapshot) => {
      setTeachers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Teacher[]);
      setPublicDataLoaded(true);
    }, (error) => {
      console.error('Failed to subscribe to teachers:', error);
      setPublicDataLoaded(true);
    });

    const unsubscribeStudents = onSnapshot(collection(firestore, 'students'), (snapshot) => {
      setStudents(snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          image: data.image || data.avatar || '',
        };
      }) as Student[]);
      setPublicDataLoaded(true);
    }, (error) => {
      console.error('Failed to subscribe to students:', error);
      setPublicDataLoaded(true);
    });

    const mapReviews = (snapshot: { docs: { id: string; data: () => Record<string, unknown> }[] }) => {
      const items = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: (data.createdAt as { toDate?: () => Date } | undefined)?.toDate?.() || new Date(),
        };
      }) as Review[];
      items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setReviews(items);
    };

    let unsubscribeReviews = () => {};
    const reviewsQuery = query(collection(firestore, 'reviews'), orderBy('createdAt', 'desc'));
    unsubscribeReviews = onSnapshot(reviewsQuery, mapReviews, (error) => {
      console.error('Failed to subscribe to reviews (ordered):', error);
      unsubscribeReviews();
      unsubscribeReviews = onSnapshot(collection(firestore, 'reviews'), mapReviews, (fallbackError) => {
        console.error('Failed to subscribe to reviews:', fallbackError);
      });
    });

    return () => {
      window.clearTimeout(readyTimeout);
      unsubscribeCourses();
      unsubscribeTeachers();
      unsubscribeStudents();
      unsubscribeReviews();
    };
  }, []);

  useEffect(() => {
    if (!auth) {
      setAuthUser(null);
      setAuthLoading(false);
      return;
    }

    if (!isAdminRoute) {
      setAuthLoading(false);
      const unsubscribe = onAuthStateChanged(auth, setAuthUser);
      return () => unsubscribe();
    }

    setAuthLoading(true);
    const authReadyTimeout = window.setTimeout(() => setAuthLoading(false), 2000);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      window.clearTimeout(authReadyTimeout);
      setAuthUser(user);
      setAuthLoading(false);
    });

    return () => {
      window.clearTimeout(authReadyTimeout);
      unsubscribe();
    };
  }, [isAdminRoute]);

  useEffect(() => {
    if (!db || !authUser) {
      setLeads([]);
      return;
    }

    const firestore = db;

    const mapLeads = (snapshot: { docs: { id: string; data: () => Record<string, unknown> }[] }) => {
      const items = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: (data.createdAt as { toDate?: () => Date } | undefined)?.toDate?.() || new Date(),
        };
      }) as Lead[];
      items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setLeads(items);
    };

    let unsubscribeLeads = () => {};
    const leadsQuery = query(collection(firestore, 'leads'), orderBy('createdAt', 'desc'));
    unsubscribeLeads = onSnapshot(leadsQuery, mapLeads, (error) => {
      console.error('Failed to subscribe to leads (ordered):', error);
      unsubscribeLeads();
      unsubscribeLeads = onSnapshot(collection(firestore, 'leads'), mapLeads, (fallbackError) => {
        console.error('Failed to subscribe to leads:', fallbackError);
      });
    });

    return () => unsubscribeLeads();
  }, [authUser]);

  // Course CRUD (admin only)
  const addCourse = async (course: Omit<Course, 'id'>) => {
    requireSignedIn();
    const firestore = requireDb();
    await addDoc(collection(firestore, 'courses'), stripUndefined(course));
  };

  const updateCourse = async (id: string, course: Omit<Course, 'id'>) => {
    requireSignedIn();
    const firestore = requireDb();
    await updateDoc(doc(firestore, 'courses', id), stripUndefined(course));
  };

  const deleteCourse = async (id: string) => {
    requireSignedIn();
    const firestore = requireDb();
    await deleteDoc(doc(firestore, 'courses', id));
  };

  // Teacher CRUD (admin only)
  const addTeacher = async (teacher: Omit<Teacher, 'id'>) => {
    requireSignedIn();
    const firestore = requireDb();
    await addDoc(collection(firestore, 'teachers'), stripUndefined(teacher));
  };

  const updateTeacher = async (id: string, teacher: Omit<Teacher, 'id'>) => {
    requireSignedIn();
    const firestore = requireDb();
    await updateDoc(doc(firestore, 'teachers', id), stripUndefined(teacher));
  };

  const deleteTeacher = async (id: string) => {
    requireSignedIn();
    const firestore = requireDb();
    await deleteDoc(doc(firestore, 'teachers', id));
  };

  // Student CRUD (admin only)
  const addStudent = async (student: Omit<Student, 'id'>) => {
    requireSignedIn();
    const firestore = requireDb();
    await addDoc(collection(firestore, 'students'), stripUndefined(student));
  };

  const updateStudent = async (id: string, student: Omit<Student, 'id'>) => {
    requireSignedIn();
    const firestore = requireDb();
    await updateDoc(doc(firestore, 'students', id), stripUndefined(student));
  };

  const deleteStudent = async (id: string) => {
    requireSignedIn();
    const firestore = requireDb();
    await deleteDoc(doc(firestore, 'students', id));
  };

  // Lead: public create, admin read/update/delete
  const addLead = async (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    const firestore = requireDb();
    const payload = stripUndefined({
      name: lead.name.trim(),
      phone: lead.phone.trim(),
      age: lead.age.trim(),
      course: lead.course.trim(),
      status: 'new' as const,
      createdAt: Timestamp.now(),
    });
    await addDoc(collection(firestore, 'leads'), payload);
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    requireSignedIn();
    const firestore = requireDb();
    await updateDoc(doc(firestore, 'leads', id), { status });
  };

  const deleteLead = async (id: string) => {
    requireSignedIn();
    const firestore = requireDb();
    await deleteDoc(doc(firestore, 'leads', id));
  };

  // Review: public create, admin delete
  const addReview = async (review: Omit<Review, 'id' | 'createdAt'>) => {
    const firestore = requireDb();
    const ref = await addDoc(collection(firestore, 'reviews'), {
      ...review,
      createdAt: Timestamp.now(),
    });
    return ref.id;
  };

  const deleteReview = async (id: string) => {
    requireSignedIn();
    const firestore = requireDb();
    await deleteDoc(doc(firestore, 'reviews', id));
  };

  return (
    <DataContext.Provider value={{
      authUser, authLoading, publicDataLoaded,
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
