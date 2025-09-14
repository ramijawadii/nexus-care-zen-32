import { useState, useEffect } from 'react';
import { patientService, type SimplePatient, type PatientInsert, type PatientUpdate, type PaginationParams, type SearchParams, type ApiResponse } from '@/services/database';

export const usePatients = (params?: PaginationParams & SearchParams) => {
  const [patients, setPatients] = useState<SimplePatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);

    const response = await patientService.getPatients(params);
    
    if (response.error) {
      setError(response.error);
    } else {
      setPatients(response.data || []);
      setTotalCount(response.count || 0);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, [JSON.stringify(params)]);

  const createPatient = async (patientData: PatientInsert) => {
    const response = await patientService.createPatient(patientData);
    
    if (response.error) {
      setError(response.error);
      return null;
    }
    
    await fetchPatients(); // Refresh the list
    return response.data;
  };

  const updatePatient = async (id: string, updates: PatientUpdate) => {
    const response = await patientService.updatePatient(id, updates);
    
    if (response.error) {
      setError(response.error);
      return null;
    }
    
    await fetchPatients(); // Refresh the list
    return response.data;
  };

  const deletePatient = async (id: string) => {
    const response = await patientService.deletePatient(id);
    
    if (response.error) {
      setError(response.error);
      return false;
    }
    
    await fetchPatients(); // Refresh the list
    return true;
  };

  return {
    patients,
    loading,
    error,
    totalCount,
    refetch: fetchPatients,
    createPatient,
    updatePatient,
    deletePatient,
  };
};

export const usePatient = (id: string) => {
  const [patient, setPatient] = useState<SimplePatient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    const response = await patientService.getPatientById(id);
    
    if (response.error) {
      setError(response.error);
    } else {
      setPatient(response.data || null);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchPatient();
  }, [id]);

  return {
    patient,
    loading,
    error,
    refetch: fetchPatient,
  };
};