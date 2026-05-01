import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import type { Course, Teacher, Student, Lead } from '@/context/DataContext';

// Courses Hook
export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'courses'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const coursesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
      setCourses(coursesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addCourse = async (course: Omit<Course, 'id'>) => {
    if (!isFirebaseConfigured()) return;
    await addDoc(collection(db, 'courses'), course);
  };

  const updateCourse = async (id: string, course: Omit<Course, 'id'>) => {
    if (!isFirebaseConfigured()) return;
    await updateDoc(doc(db, 'courses', id), { ...course });
  };

  const deleteCourse = async (id: string) => {
    if (!isFirebaseConfigured()) return;
    await deleteDoc(doc(db, 'courses', id));
  };

  return { courses, loading, addCourse, updateCourse, deleteCourse };
}

// Teachers Hook
export function useTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'teachers'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const teachersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Teacher[];
      setTeachers(teachersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addTeacher = async (teacher: Omit<Teacher, 'id'>) => {
    if (!isFirebaseConfigured()) return;
    await addDoc(collection(db, 'teachers'), teacher);
  };

  const updateTeacher = async (id: string, teacher: Omit<Teacher, 'id'>) => {
    if (!isFirebaseConfigured()) return;
    await updateDoc(doc(db, 'teachers', id), { ...teacher });
  };

  const deleteTeacher = async (id: string) => {
    if (!isFirebaseConfigured()) return;
    await deleteDoc(doc(db, 'teachers', id));
  };

  return { teachers, loading, addTeacher, updateTeacher, deleteTeacher };
}

// Students Hook
export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'students'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Student[];
      setStudents(studentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addStudent = async (student: Omit<Student, 'id'>) => {
    if (!isFirebaseConfigured()) return;
    await addDoc(collection(db, 'students'), student);
  };

  const updateStudent = async (id: string, student: Omit<Student, 'id'>) => {
    if (!isFirebaseConfigured()) return;
    await updateDoc(doc(db, 'students', id), { ...student });
  };

  const deleteStudent = async (id: string) => {
    if (!isFirebaseConfigured()) return;
    await deleteDoc(doc(db, 'students', id));
  };

  return { students, loading, addStudent, updateStudent, deleteStudent };
}

// Leads Hook
export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date()
        };
      }) as Lead[];
      setLeads(leadsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addLead = async (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    if (!isFirebaseConfigured()) return;
    await addDoc(collection(db, 'leads'), {
      ...lead,
      status: 'new',
      createdAt: Timestamp.now()
    });
  };

  const updateLeadStatus = async (id: string, status: Lead['status']) => {
    if (!isFirebaseConfigured()) return;
    await updateDoc(doc(db, 'leads', id), { status });
  };

  const deleteLead = async (id: string) => {
    if (!isFirebaseConfigured()) return;
    await deleteDoc(doc(db, 'leads', id));
  };

  return { leads, loading, addLead, updateLeadStatus, deleteLead };
}
