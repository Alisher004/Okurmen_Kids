'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  phone: string;
  email: string;
}

export interface Student {
  id: string;
  name: string;
  course: string;
  achievement: string;
  avatar: string;
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

interface DataContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, course: Omit<Course, 'id'>) => void;
  deleteCourse: (id: string) => void;
  
  teachers: Teacher[];
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  updateTeacher: (id: string, teacher: Omit<Teacher, 'id'>) => void;
  deleteTeacher: (id: string) => void;
  
  students: Student[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Omit<Student, 'id'>) => void;
  deleteStudent: (id: string) => void;
  
  leads: Lead[];
  addLead: (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => void;
  updateLeadStatus: (id: string, status: Lead['status']) => void;
  deleteLead: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEYS = {
  COURSES: 'okurmen_courses',
  TEACHERS: 'okurmen_teachers',
  STUDENTS: 'okurmen_students',
  LEADS: 'okurmen_leads',
};

const defaultCourses: Course[] = [];

const defaultTeachers: Teacher[] = [];

const defaultStudents: Student[] = [];

export function DataProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loadedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
      const loadedTeachers = localStorage.getItem(STORAGE_KEYS.TEACHERS);
      const loadedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      const loadedLeads = localStorage.getItem(STORAGE_KEYS.LEADS);

      setCourses(loadedCourses ? JSON.parse(loadedCourses) : defaultCourses);
      setTeachers(loadedTeachers ? JSON.parse(loadedTeachers) : defaultTeachers);
      setStudents(loadedStudents ? JSON.parse(loadedStudents) : defaultStudents);
      setLeads(loadedLeads ? JSON.parse(loadedLeads) : []);
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    }
  }, [courses, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
    }
  }, [teachers, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    }
  }, [students, isLoaded]);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    }
  }, [leads, isLoaded]);

  // Course CRUD
  const addCourse = (course: Omit<Course, 'id'>) => {
    setCourses(prev => [...prev, { ...course, id: Date.now().toString() }]);
  };

  const updateCourse = (id: string, course: Omit<Course, 'id'>) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...course, id } : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  // Teacher CRUD
  const addTeacher = (teacher: Omit<Teacher, 'id'>) => {
    setTeachers(prev => [...prev, { ...teacher, id: Date.now().toString() }]);
  };

  const updateTeacher = (id: string, teacher: Omit<Teacher, 'id'>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...teacher, id } : t));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  // Student CRUD
  const addStudent = (student: Omit<Student, 'id'>) => {
    setStudents(prev => [...prev, { ...student, id: Date.now().toString() }]);
  };

  const updateStudent = (id: string, student: Omit<Student, 'id'>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...student, id } : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  // Lead CRUD
  const addLead = (lead: Omit<Lead, 'id' | 'status' | 'createdAt'>) => {
    const newLead: Lead = {
      ...lead,
      id: Date.now().toString(),
      status: 'new',
      createdAt: new Date(),
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status } : lead));
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  return (
    <DataContext.Provider value={{
      courses, addCourse, updateCourse, deleteCourse,
      teachers, addTeacher, updateTeacher, deleteTeacher,
      students, addStudent, updateStudent, deleteStudent,
      leads, addLead, updateLeadStatus, deleteLead,
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
