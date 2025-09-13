import { useState, useEffect } from 'react';
import { appointmentService, type SimpleAppointment, type PaginationParams, type SearchParams } from '@/services/database';

export const useAppointments = (params?: PaginationParams & SearchParams) => {
  const [appointments, setAppointments] = useState<SimpleAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);

    const response = await appointmentService.getAppointments(params);
    
    if (response.error) {
      setError(response.error);
    } else {
      setAppointments(response.data || []);
      setTotalCount(response.count || 0);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, [JSON.stringify(params)]);

  const createAppointment = async (appointmentData: AppointmentInsert) => {
    const response = await appointmentService.createAppointment(appointmentData);
    
    if (response.error) {
      setError(response.error);
      return null;
    }
    
    await fetchAppointments(); // Refresh the list
    return response.data;
  };

  const updateAppointment = async (id: string, updates: AppointmentUpdate) => {
    const response = await appointmentService.updateAppointment(id, updates);
    
    if (response.error) {
      setError(response.error);
      return null;
    }
    
    await fetchAppointments(); // Refresh the list
    return response.data;
  };

  const deleteAppointment = async (id: string) => {
    const response = await appointmentService.deleteAppointment(id);
    
    if (response.error) {
      setError(response.error);
      return false;
    }
    
    await fetchAppointments(); // Refresh the list
    return true;
  };

  return {
    appointments,
    loading,
    error,
    totalCount,
    refetch: fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
};

// Hook for appointments by date range
export const useAppointmentsByDate = (startDate: Date, endDate: Date) => {
  const [appointments, setAppointments] = useState<SimpleAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);

    const params = {
      filters: {
        appointment_date: {
          gte: startDate.toISOString().split('T')[0],
          lte: endDate.toISOString().split('T')[0]
        }
      }
    };

    const response = await appointmentService.getAppointments(params);
    
    if (response.error) {
      setError(response.error);
    } else {
      setAppointments(response.data || []);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, [startDate.toISOString(), endDate.toISOString()]);

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
  };
};