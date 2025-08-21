
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Patient, Consultation } from '@/types/patient';
import { Search, Plus, Calendar, FileText, Paperclip } from 'lucide-react';

interface PatientConsultationsProps {
  patient: Patient;
}

const PatientConsultations = ({ patient }: PatientConsultationsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  // Mock consultation data since patient.consultations is empty
  const mockConsultations: Consultation[] = [
    {
      id: '1',
      date: '2024-01-15',
      reason: 'Annual Physical Exam',
      subjective: 'Patient reports feeling generally well. No specific complaints. Some fatigue over the past few weeks.',
      objective: 'Vital signs stable. BP 120/80, HR 72, Temp 98.6°F. Physical examination unremarkable.',
      assessment: 'Overall good health. Mild fatigue likely due to work stress.',
      plan: 'Continue current lifestyle. Follow up in 6 months. Recommended stress management techniques.',
      followUpDate: '2024-07-15'
    },
    {
      id: '2',
      date: '2023-11-20',
      reason: 'Follow-up Hypertension',
      subjective: 'Patient reports good medication compliance. No side effects noted.',
      objective: 'BP 118/78, improved from last visit. No signs of end-organ damage.',
      assessment: 'Hypertension well controlled on current regimen.',
      plan: 'Continue Lisinopril 10mg daily. Return in 3 months for BP check.',
      followUpDate: '2024-02-20'
    }
  ];

  const consultations = mockConsultations.filter(consultation =>
    consultation.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.assessment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="relative flex-1 mr-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-text-subtle" />
          <Input
            placeholder="Search consultations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Consultation
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consultations List */}
        <div className="lg:col-span-1 space-y-3">
          {consultations.length > 0 ? (
            consultations.map((consultation) => (
              <Card 
                key={consultation.id} 
                className={`cursor-pointer transition-colors ${
                  selectedConsultation?.id === consultation.id 
                    ? 'ring-2 ring-ring bg-accent' 
                    : 'hover:bg-hover-surface'
                }`}
                onClick={() => setSelectedConsultation(consultation)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-text-secondary" />
                      <span className="text-sm font-medium">
                        {new Date(consultation.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-medium text-text-primary mb-1">
                    {consultation.reason}
                  </h4>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {consultation.assessment}
                  </p>
                  {consultation.attachments && consultation.attachments.length > 0 && (
                    <div className="flex items-center mt-2">
                      <Paperclip className="w-3 h-3 mr-1 text-text-subtle" />
                      <span className="text-xs text-text-subtle">
                        {consultation.attachments.length} attachment(s)
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 mx-auto text-text-subtle mb-4" />
                <p className="text-text-secondary">No consultations found</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Consultation Details */}
        <div className="lg:col-span-2">
          {selectedConsultation ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <h3>{selectedConsultation.reason}</h3>
                    <p className="text-sm text-text-secondary font-normal">
                      {new Date(selectedConsultation.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <Button size="sm">Edit</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* SOAP Format */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                      <Badge variant="outline" className="mr-2">S</Badge>
                      Subjective
                    </h4>
                    <p className="text-text-secondary text-sm bg-surface p-3 rounded-lg">
                      {selectedConsultation.subjective}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                      <Badge variant="outline" className="mr-2">O</Badge>
                      Objective
                    </h4>
                    <p className="text-text-secondary text-sm bg-surface p-3 rounded-lg">
                      {selectedConsultation.objective}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                      <Badge variant="outline" className="mr-2">A</Badge>
                      Assessment
                    </h4>
                    <p className="text-text-secondary text-sm bg-surface p-3 rounded-lg">
                      {selectedConsultation.assessment}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                      <Badge variant="outline" className="mr-2">P</Badge>
                      Plan
                    </h4>
                    <p className="text-text-secondary text-sm bg-surface p-3 rounded-lg">
                      {selectedConsultation.plan}
                    </p>
                  </div>
                </div>

                {selectedConsultation.followUpDate && (
                  <div className="border-t border-border-primary pt-4">
                    <h4 className="font-semibold text-text-primary mb-2">Follow-up</h4>
                    <p className="text-text-secondary">
                      Scheduled for: {new Date(selectedConsultation.followUpDate).toLocaleDateString()}
                    </p>
                  </div>
                )}

                {selectedConsultation.attachments && selectedConsultation.attachments.length > 0 && (
                  <div className="border-t border-border-primary pt-4">
                    <h4 className="font-semibold text-text-primary mb-2">Attachments</h4>
                    <div className="space-y-2">
                      {selectedConsultation.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center p-2 bg-surface rounded">
                          <Paperclip className="w-4 h-4 mr-2 text-text-secondary" />
                          <span className="text-text-secondary">{attachment}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 mx-auto text-text-subtle mb-4" />
                <h3 className="text-lg font-medium text-text-primary mb-2">
                  Select a Consultation
                </h3>
                <p className="text-text-secondary">
                  Choose a consultation from the list to view details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientConsultations;
