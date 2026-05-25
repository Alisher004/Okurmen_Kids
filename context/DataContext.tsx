'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
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
  getDoc,
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '@/lib/firebase';
import { requireAdminRole, requireStaffRole, stripUndefined } from '@/lib/firestoreAdmin';
import { isAdminEmail } from '@/lib/adminAuth';
import { isStaffRole, isAdminRole } from '@/lib/roles';
import type {
  Course,
  Teacher,
  Student,
  Lead,
  LeadStatus,
  TrialLesson,
  Banner,
  FaqItem,
  VideoReview,
  TestQuestion,
  TestResult,
  UserRole,
} from '@/lib/types';

export type {
  Course,
  Teacher,
  Student,
  Lead,
  LeadStatus,
  TrialLesson,
  Banner,
  FaqItem,
  VideoReview,
  TestQuestion,
  TestResult,
  UserRole,
};

interface DataContextType {
  firebaseConfigured: boolean;
  authUser: User | null;
  authLoading: boolean;
  userRole: UserRole | null;
  isAdmin: boolean;
  isManager: boolean;
  isStaff: boolean;
  publicDataLoaded: boolean;
  firebaseError: string | null;

  banners: Banner[];
  addBanner: (b: Omit<Banner, 'id'>) => Promise<void>;
  updateBanner: (id: string, b: Omit<Banner, 'id'>) => Promise<void>;
  deleteBanner: (id: string) => Promise<void>;

  faqItems: FaqItem[];
  addFaq: (f: Omit<FaqItem, 'id'>) => Promise<void>;
  updateFaq: (id: string, f: Omit<FaqItem, 'id'>) => Promise<void>;
  deleteFaq: (id: string) => Promise<void>;

  testQuestions: TestQuestion[];
  addTestQuestion: (q: Omit<TestQuestion, 'id'>) => Promise<void>;
  updateTestQuestion: (id: string, q: Omit<TestQuestion, 'id'>) => Promise<void>;
  deleteTestQuestion: (id: string) => Promise<void>;

  videoReviews: VideoReview[];
  addVideoReview: (v: Omit<VideoReview, 'id'>) => Promise<void>;
  updateVideoReview: (id: string, v: Omit<VideoReview, 'id'>) => Promise<void>;
  deleteVideoReview: (id: string) => Promise<void>;

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
  updateLead: (id: string, data: Partial<Pick<Lead, 'status' | 'notes'>>) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;

  trialLessons: TrialLesson[];
  addTrialLesson: (t: Omit<TrialLesson, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  updateTrialLesson: (id: string, data: Partial<Pick<TrialLesson, 'status' | 'notes'>>) => Promise<void>;
  deleteTrialLesson: (id: string) => Promise<void>;

  testResults: TestResult[];
  addTestResult: (result: Omit<TestResult, 'id' | 'createdAt'>) => Promise<void>;
  deleteTestResult: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

function requireDb(): NonNullable<typeof db> {
  if (!db) throw new Error('Firebase Firestore конфигурациясы табылган жок.');
  return db;
}

function mapTimestamp(data: Record<string, unknown>, field = 'createdAt'): Date {
  const value = data[field];
  if (value && typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate();
  }
  return new Date();
}

function sortByOrder<T extends { order?: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function DataProvider({ children }: { children: ReactNode }) {
  const firebaseConfigured = isFirebaseConfigured();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [videoReviews, setVideoReviews] = useState<VideoReview[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [trialLessons, setTrialLessons] = useState<TrialLesson[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [authLoading, setAuthLoading] = useState(firebaseConfigured);
  const [publicDataLoaded, setPublicDataLoaded] = useState(!firebaseConfigured);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const pathname = usePathname();
  const isProtectedRoute =
    pathname?.startsWith('/admin') || pathname?.startsWith('/manager') || false;

  const isAdmin = useMemo(
    () => isAdminRole(userRole) || isAdminEmail(authUser?.email),
    [userRole, authUser?.email]
  );
  const isManager = useMemo(() => userRole === 'manager', [userRole]);
  const isStaff = useMemo(() => isStaffRole(userRole) || isAdmin, [userRole, isAdmin]);

  const markLoaded = useCallback(() => setPublicDataLoaded(true), []);

  useEffect(() => {
    if (!db) {
      markLoaded();
      return;
    }
    const firestore = db;
    const readyTimeout = window.setTimeout(markLoaded, 2500);
    const onErr = (label: string) => (error: Error) => {
      console.error(`Firestore ${label}:`, error);
      setFirebaseError(error.message);
      markLoaded();
    };

    const mapOrdered = <T extends { id: string; order?: number }>(
      snapshot: { docs: { id: string; data: () => Record<string, unknown> }[] },
      setter: (items: T[]) => void
    ) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as T);
      setter(sortByOrder(items));
      markLoaded();
    };

    const unsubs = [
      onSnapshot(collection(firestore, 'banners'), (s) => mapOrdered<Banner>(s, setBanners), onErr('banners')),
      onSnapshot(collection(firestore, 'faq'), (s) => mapOrdered<FaqItem>(s, setFaqItems), onErr('faq')),
      onSnapshot(collection(firestore, 'testQuestions'), (s) => mapOrdered<TestQuestion>(s, setTestQuestions), onErr('testQuestions')),
      onSnapshot(collection(firestore, 'videoReviews'), (s) => mapOrdered<VideoReview>(s, setVideoReviews), onErr('videoReviews')),
      onSnapshot(collection(firestore, 'courses'), (s) => {
        setCourses(s.docs.map((d) => ({ id: d.id, ...d.data() })) as Course[]);
        markLoaded();
      }, onErr('courses')),
      onSnapshot(collection(firestore, 'teachers'), (s) => mapOrdered<Teacher>(s, setTeachers), onErr('teachers')),
      onSnapshot(collection(firestore, 'students'), (s) => {
        setStudents(
          s.docs.map((d) => {
            const data = d.data();
            return { id: d.id, ...data, image: (data.image as string) || (data.avatar as string) || '' };
          }) as Student[]
        );
        markLoaded();
      }, onErr('students')),
    ];

    return () => {
      window.clearTimeout(readyTimeout);
      unsubs.forEach((u) => u());
    };
  }, [markLoaded]);

  useEffect(() => {
    if (!auth) {
      setAuthUser(null);
      setUserRole(null);
      setAuthLoading(false);
      return;
    }
    setAuthLoading(isProtectedRoute);
    const unsub = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);
      if (!user || !db) {
        setUserRole(null);
        setAuthLoading(false);
        return;
      }
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        if (snap.exists()) {
          const role = snap.data().role as UserRole;
          setUserRole(role === 'admin' || role === 'manager' ? role : null);
        } else if (isAdminEmail(user.email)) {
          setUserRole('admin');
        } else {
          setUserRole(null);
        }
      } catch {
        setUserRole(isAdminEmail(user.email) ? 'admin' : null);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, [isProtectedRoute]);

  useEffect(() => {
    if (!db || !authUser || !isStaff) {
      setLeads([]);
      setTrialLessons([]);
      setTestResults([]);
      return;
    }
    const firestore = db;

    const mapLeads = (snapshot: { docs: { id: string; data: () => Record<string, unknown> }[] }) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: mapTimestamp(d.data()),
      })) as Lead[];
      items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setLeads(items);
    };

    const mapTrials = (snapshot: { docs: { id: string; data: () => Record<string, unknown> }[] }) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: mapTimestamp(d.data()),
      })) as TrialLesson[];
      items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setTrialLessons(items);
    };

    const mapTests = (snapshot: { docs: { id: string; data: () => Record<string, unknown> }[] }) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: mapTimestamp(d.data()),
      })) as TestResult[];
      items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setTestResults(items);
    };

    let u1 = onSnapshot(query(collection(firestore, 'leads'), orderBy('createdAt', 'desc')), mapLeads, () => {
      u1 = onSnapshot(collection(firestore, 'leads'), mapLeads);
    });
    let u2 = onSnapshot(query(collection(firestore, 'trialLessons'), orderBy('createdAt', 'desc')), mapTrials, () => {
      u2 = onSnapshot(collection(firestore, 'trialLessons'), mapTrials);
    });
    let u3 = onSnapshot(query(collection(firestore, 'testResults'), orderBy('createdAt', 'desc')), mapTests, () => {
      u3 = onSnapshot(collection(firestore, 'testResults'), mapTests);
    });

    return () => {
      u1();
      u2();
      u3();
    };
  }, [authUser, isStaff]);

  const adminGuard = () => requireAdminRole(isAdmin);
  const staffGuard = () => requireStaffRole(isStaff);

  const addBanner = async (b: Omit<Banner, 'id'>) => {
    adminGuard();
    await addDoc(collection(requireDb(), 'banners'), stripUndefined(b));
  };
  const updateBanner = async (id: string, b: Omit<Banner, 'id'>) => {
    adminGuard();
    await updateDoc(doc(requireDb(), 'banners', id), stripUndefined(b));
  };
  const deleteBanner = async (id: string) => {
    adminGuard();
    await deleteDoc(doc(requireDb(), 'banners', id));
  };

  const addFaq = async (f: Omit<FaqItem, 'id'>) => {
    adminGuard();
    await addDoc(collection(requireDb(), 'faq'), stripUndefined(f));
  };
  const updateFaq = async (id: string, f: Omit<FaqItem, 'id'>) => {
    adminGuard();
    await updateDoc(doc(requireDb(), 'faq', id), stripUndefined(f));
  };
  const deleteFaq = async (id: string) => {
    adminGuard();
    await deleteDoc(doc(requireDb(), 'faq', id));
  };

  const addTestQuestion = async (q: Omit<TestQuestion, 'id'>) => {
    adminGuard();
    await addDoc(collection(requireDb(), 'testQuestions'), stripUndefined(q));
  };
  const updateTestQuestion = async (id: string, q: Omit<TestQuestion, 'id'>) => {
    adminGuard();
    await updateDoc(doc(requireDb(), 'testQuestions', id), stripUndefined(q));
  };
  const deleteTestQuestion = async (id: string) => {
    adminGuard();
    await deleteDoc(doc(requireDb(), 'testQuestions', id));
  };

  const addVideoReview = async (v: Omit<VideoReview, 'id'>) => {
    adminGuard();
    await addDoc(collection(requireDb(), 'videoReviews'), stripUndefined(v));
  };
  const updateVideoReview = async (id: string, v: Omit<VideoReview, 'id'>) => {
    adminGuard();
    await updateDoc(doc(requireDb(), 'videoReviews', id), stripUndefined(v));
  };
  const deleteVideoReview = async (id: string) => {
    adminGuard();
    await deleteDoc(doc(requireDb(), 'videoReviews', id));
  };

  const addCourse = async (course: Omit<Course, 'id'>) => {
    adminGuard();
    await addDoc(collection(requireDb(), 'courses'), stripUndefined(course));
  };
  const updateCourse = async (id: string, course: Omit<Course, 'id'>) => {
    adminGuard();
    await updateDoc(doc(requireDb(), 'courses', id), stripUndefined(course));
  };
  const deleteCourse = async (id: string) => {
    adminGuard();
    await deleteDoc(doc(requireDb(), 'courses', id));
  };

  const addTeacher = async (teacher: Omit<Teacher, 'id'>) => {
    adminGuard();
    await addDoc(collection(requireDb(), 'teachers'), stripUndefined(teacher));
  };
  const updateTeacher = async (id: string, teacher: Omit<Teacher, 'id'>) => {
    adminGuard();
    await updateDoc(doc(requireDb(), 'teachers', id), stripUndefined(teacher));
  };
  const deleteTeacher = async (id: string) => {
    adminGuard();
    await deleteDoc(doc(requireDb(), 'teachers', id));
  };

  const addStudent = async (student: Omit<Student, 'id'>) => {
    adminGuard();
    await addDoc(collection(requireDb(), 'students'), stripUndefined(student));
  };
  const updateStudent = async (id: string, student: Omit<Student, 'id'>) => {
    adminGuard();
    await updateDoc(doc(requireDb(), 'students', id), stripUndefined(student));
  };
  const deleteStudent = async (id: string) => {
    adminGuard();
    await deleteDoc(doc(requireDb(), 'students', id));
  };

  const addLead = async (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    await addDoc(collection(requireDb(), 'leads'), {
      name: lead.name.trim(),
      phone: lead.phone.trim(),
      age: lead.age.trim(),
      course: lead.course.trim(),
      comment: lead.comment?.trim() || '',
      notes: '',
      status: 'new' as LeadStatus,
      createdAt: Timestamp.now(),
    });
  };
  const updateLead = async (id: string, data: Partial<Pick<Lead, 'status' | 'notes'>>) => {
    staffGuard();
    await updateDoc(doc(requireDb(), 'leads', id), stripUndefined(data as Record<string, unknown>));
  };
  const deleteLead = async (id: string) => {
    adminGuard();
    await deleteDoc(doc(requireDb(), 'leads', id));
  };

  const addTrialLesson = async (t: Omit<TrialLesson, 'id' | 'status' | 'createdAt'>) => {
    await addDoc(collection(requireDb(), 'trialLessons'), {
      childName: t.childName.trim(),
      parentPhone: t.parentPhone.trim(),
      childAge: t.childAge.trim(),
      courseInterest: t.courseInterest.trim(),
      comment: t.comment?.trim() || '',
      notes: '',
      status: 'new',
      createdAt: Timestamp.now(),
    });
  };
  const updateTrialLesson = async (id: string, data: Partial<Pick<TrialLesson, 'status' | 'notes'>>) => {
    staffGuard();
    await updateDoc(doc(requireDb(), 'trialLessons', id), stripUndefined(data as Record<string, unknown>));
  };
  const deleteTrialLesson = async (id: string) => {
    adminGuard();
    await deleteDoc(doc(requireDb(), 'trialLessons', id));
  };

  const addTestResult = async (result: Omit<TestResult, 'id' | 'createdAt'>) => {
    await addDoc(collection(requireDb(), 'testResults'), {
      name: result.name.trim(),
      phone: result.phone?.trim() || '',
      age: result.age?.trim() || '',
      score: result.score,
      totalQuestions: result.totalQuestions,
      percentage: result.percentage,
      createdAt: Timestamp.now(),
    });
  };
  const deleteTestResult = async (id: string) => {
    adminGuard();
    await deleteDoc(doc(requireDb(), 'testResults', id));
  };

  return (
    <DataContext.Provider
      value={{
        firebaseConfigured,
        authUser,
        authLoading,
        userRole,
        isAdmin,
        isManager,
        isStaff,
        publicDataLoaded,
        firebaseError,
        banners,
        addBanner,
        updateBanner,
        deleteBanner,
        faqItems,
        addFaq,
        updateFaq,
        deleteFaq,
        testQuestions,
        addTestQuestion,
        updateTestQuestion,
        deleteTestQuestion,
        videoReviews,
        addVideoReview,
        updateVideoReview,
        deleteVideoReview,
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        teachers,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        leads,
        addLead,
        updateLead,
        deleteLead,
        trialLessons,
        addTrialLesson,
        updateTrialLesson,
        deleteTrialLesson,
        testResults,
        addTestResult,
        deleteTestResult,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
}
