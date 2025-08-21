import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  Paperclip, 
  Upload,
  Download,
  X,
  Plus,
  Clock,
  User
} from 'lucide-react';

interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  type: 'pre-appointment' | 'during-appointment' | 'post-appointment';
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface AppointmentNotesProps {
  appointmentId: string;
  notes: Note[];
  attachments: Attachment[];
  onAddNote: (note: string, type: Note['type']) => void;
  onAddAttachment: (file: File) => void;
  onRemoveAttachment: (id: string) => void;
}

const AppointmentNotes = ({
  appointmentId,
  notes,
  attachments,
  onAddNote,
  onAddAttachment,
  onRemoveAttachment
}: AppointmentNotesProps) => {
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<Note['type']>('pre-appointment');
  const [showQuickTemplates, setShowQuickTemplates] = useState(false);

  const quickTemplates = [
    'Please bring MRI results from previous visit',
    'Fasting required - no food 12 hours before appointment',
    'Bring all current medications for review',
    'Follow-up appointment scheduled for 2 weeks',
    'Lab results to be reviewed during visit',
    'Patient may need extended consultation time'
  ];

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim(), noteType);
      setNewNote('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        onAddAttachment(file);
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTypeColor = (type: Note['type']) => {
    switch (type) {
      case 'pre-appointment': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'during-appointment': return 'bg-green-50 text-green-700 border-green-200';
      case 'post-appointment': return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Notes Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Appointment Notes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add New Note */}
          <div className="space-y-3">
            <div className="flex space-x-2">
              <select
                value={noteType}
                onChange={(e) => setNoteType(e.target.value as Note['type'])}
                className="border border-border-primary rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-focus-ring"
              >
                <option value="pre-appointment">Pre-appointment</option>
                <option value="during-appointment">During appointment</option>
                <option value="post-appointment">Post-appointment</option>
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQuickTemplates(!showQuickTemplates)}
              >
                Quick Templates
              </Button>
            </div>

            {showQuickTemplates && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {quickTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => setNewNote(template)}
                    className="text-left p-2 text-sm bg-surface hover:bg-hover-surface border border-border-primary rounded-md transition-colors"
                  >
                    {template}
                  </button>
                ))}
              </div>
            )}

            <div className="flex space-x-2">
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 resize-none"
                rows={3}
              />
            </div>
            <Button onClick={handleAddNote} disabled={!newNote.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>

          {/* Existing Notes */}
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="border border-border-primary rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getTypeColor(note.type)}>
                    {note.type.replace('-', ' ')}
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-text-muted">
                    <User className="h-3 w-3" />
                    <span>{note.author}</span>
                    <Clock className="h-3 w-3" />
                    <span>{note.timestamp}</span>
                  </div>
                </div>
                <p className="text-text-primary">{note.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Attachments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Paperclip className="h-5 w-5" />
            <span>File Attachments</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Area */}
          <div className="border-2 border-dashed border-border-primary rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-text-muted" />
            <p className="text-text-secondary mb-2">
              Drag and drop files here, or click to browse
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="outline" className="cursor-pointer">
                Choose Files
              </Button>
            </label>
            <p className="text-xs text-text-muted mt-2">
              Supported: PDF, Images, Word documents (max 10MB each)
            </p>
          </div>

          {/* Attached Files */}
          {attachments.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-text-secondary">Attached Files</h4>
              {attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center justify-between p-3 border border-border-primary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-surface-muted rounded">
                      <FileText className="h-4 w-4 text-text-muted" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">{attachment.name}</div>
                      <div className="text-sm text-text-muted">
                        {attachment.size} • Uploaded by {attachment.uploadedBy} at {attachment.uploadedAt}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onRemoveAttachment(attachment.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentNotes;
