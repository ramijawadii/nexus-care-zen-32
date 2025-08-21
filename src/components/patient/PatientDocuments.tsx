import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Patient } from '@/types/patient';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Trash2, 
  Scan,
  Brain,
  CheckCircle,
  AlertCircle,
  Clock,
  Image,
  File,
  FileSpreadsheet,
  X
} from 'lucide-react';

interface DocumentAnalysis {
  id: string;
  fileName: string;
  ocrText: string;
  aiAnalysis: {
    summary: string;
    keyFindings: string[];
    medicalTerms: string[];
    recommendations: string[];
    riskLevel: 'low' | 'medium' | 'high';
    category: string;
  };
  uploadProgress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
}

interface PatientDocumentsProps {
  patient: Patient;
}

const PatientDocuments = ({ patient }: PatientDocumentsProps) => {
  const [documents, setDocuments] = useState<DocumentAnalysis[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);

    for (const file of files) {
      const documentId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      // Add document to state with initial status
      const newDocument: DocumentAnalysis = {
        id: documentId,
        fileName: file.name,
        ocrText: '',
        aiAnalysis: {
          summary: '',
          keyFindings: [],
          medicalTerms: [],
          recommendations: [],
          riskLevel: 'low',
          category: ''
        },
        uploadProgress: 0,
        status: 'uploading'
      };

      setDocuments(prev => [...prev, newDocument]);

      try {
        // Simulate file upload with progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setDocuments(prev => prev.map(doc => 
            doc.id === documentId 
              ? { ...doc, uploadProgress: progress }
              : doc
          ));
        }

        // Change status to processing with 4-second scanning animation
        setDocuments(prev => prev.map(doc => 
          doc.id === documentId 
            ? { ...doc, status: 'processing' }
            : doc
        ));

        // Simulate OCR processing with 4-second delay for scanning animation
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        // Mock OCR text extraction
        const mockOcrText = generateMockOcrText(file.name);
        
        // Mock AI analysis
        const mockAnalysis = generateMockAnalysis(file.name, mockOcrText);

        // Update document with results
        setDocuments(prev => prev.map(doc => 
          doc.id === documentId 
            ? { 
                ...doc, 
                ocrText: mockOcrText,
                aiAnalysis: mockAnalysis,
                status: 'completed'
              }
            : doc
        ));

      } catch (error) {
        setDocuments(prev => prev.map(doc => 
          doc.id === documentId 
            ? { ...doc, status: 'error' }
            : doc
        ));
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generateMockOcrText = (fileName: string): string => {
    const ocrTexts = [
      `RAPPORT D'ANALYSE SANGUINE
      Date: ${new Date().toLocaleDateString('fr-FR')}
      Patient: ${patient.name}
      
      HÉMOGRAMME COMPLET:
      - Globules rouges: 4.2 M/μL (Normal: 4.0-5.5)
      - Hémoglobine: 13.8 g/dL (Normal: 12-16)
      - Hématocrite: 41% (Normal: 36-46)
      - Globules blancs: 7200/μL (Normal: 4000-11000)
      - Plaquettes: 285000/μL (Normal: 150000-450000)
      
      BIOCHIMIE:
      - Glucose: 92 mg/dL (Normal: 70-100)
      - Cholestérol total: 185 mg/dL (Normal: <200)
      - Triglycérides: 120 mg/dL (Normal: <150)
      - Créatinine: 0.9 mg/dL (Normal: 0.6-1.2)`,
      
      `RADIOGRAPHIE THORACIQUE
      Date: ${new Date().toLocaleDateString('fr-FR')}
      Patient: ${patient.name}
      
      TECHNIQUE: Radiographie PA et latérale du thorax
      
      RÉSULTATS:
      - Champs pulmonaires clairs bilatéralement
      - Silhouette cardiaque normale
      - Structures médiastinales normales
      - Pas d'épanchement pleural
      - Structures osseuses sans anomalie
      
      CONCLUSION: Radiographie thoracique normale`,
      
      `ORDONNANCE MÉDICALE
      Dr. Martin Dubois
      Médecin généraliste
      
      Patient: ${patient.name}
      Date: ${new Date().toLocaleDateString('fr-FR')}
      
      PRESCRIPTION:
      1. Amoxicilline 500mg - 3 fois par jour - 7 jours
      2. Paracétamol 1g - si fièvre - max 4/jour
      3. Repos au lit recommandé
      
      Contrôle dans 1 semaine si pas d'amélioration`
    ];
    
    return ocrTexts[Math.floor(Math.random() * ocrTexts.length)];
  };

  const generateMockAnalysis = (fileName: string, ocrText: string) => {
    const analyses = [
      {
        summary: "Analyse sanguine complète montrant des valeurs globalement normales avec un profil lipidique satisfaisant.",
        keyFindings: [
          "Hémogramme dans les normes",
          "Glycémie normale à jeun",
          "Cholestérol total acceptable",
          "Fonction rénale préservée"
        ],
        medicalTerms: ["Hémogramme", "Glycémie", "Cholestérol", "Créatinine", "Triglycérides"],
        recommendations: [
          "Maintenir un régime équilibré",
          "Contrôle annuel recommandé",
          "Surveiller l'évolution du cholestérol"
        ],
        riskLevel: 'low' as const,
        category: "Analyses biologiques"
      },
      {
        summary: "Radiographie thoracique normale sans anomalie pulmonaire ou cardiaque détectée.",
        keyFindings: [
          "Champs pulmonaires dégagés",
          "Silhouette cardiaque normale",
          "Absence d'épanchement pleural"
        ],
        medicalTerms: ["Radiographie", "Champs pulmonaires", "Médiastin", "Plèvre"],
        recommendations: [
          "Aucun suivi spécifique nécessaire",
          "Examen de référence pour comparaisons futures"
        ],
        riskLevel: 'low' as const,
        category: "Imagerie médicale"
      },
      {
        summary: "Prescription d'antibiotique et d'antalgique pour traitement d'infection bactérienne.",
        keyFindings: [
          "Traitement antibiotique prescrit",
          "Durée de traitement: 7 jours",
          "Contrôle médical prévu"
        ],
        medicalTerms: ["Amoxicilline", "Paracétamol", "Antibiotique", "Posologie"],
        recommendations: [
          "Respecter scrupuleusement la posologie",
          "Prendre l'antibiotique jusqu'au bout",
          "Surveillance des effets secondaires"
        ],
        riskLevel: 'medium' as const,
        category: "Ordonnances"
      }
    ];
    
    return analyses[Math.floor(Math.random() * analyses.length)];
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <File className="w-5 h-5 text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className="w-5 h-5 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Custom animations styles */}
      <style>{`
        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(800%); }
        }
        
        @keyframes float-right {
          0% { 
            opacity: 0; 
            transform: translateX(0) translateY(0) scale(0.5); 
          }
          50% { 
            opacity: 1; 
            transform: translateX(20px) translateY(-10px) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translateX(40px) translateY(-20px) scale(0.5); 
          }
        }
      `}</style>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Documents Médicaux</h2>
        <Button 
          className="flex items-center"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? 'Traitement en cours...' : 'Télécharger Document'}
        </Button>
      </div>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Documents List */}
      {documents.length > 0 ? (
        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(doc.fileName)}
                    <div>
                      <h3 className="font-medium text-text-primary">{doc.fileName}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {doc.status === 'uploading' && (
                          <>
                            <Clock className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-text-muted">Téléchargement...</span>
                          </>
                        )}
                        {doc.status === 'processing' && (
                          <>
                            <div className="relative">
                              <Scan className="w-4 h-4 text-yellow-500" />
                              {/* Scanning animation overlay */}
                              <div className="absolute inset-0 bg-yellow-200 opacity-50 animate-pulse rounded-full"></div>
                            </div>
                            <span className="text-sm text-text-muted">
                              <span className="animate-pulse">Analyse OCR et IA en cours...</span>
                            </span>
                          </>
                        )}
                        {doc.status === 'completed' && (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-text-muted">Traitement terminé</span>
                            <Badge className={getRiskBadgeColor(doc.aiAnalysis.riskLevel)}>
                              Risque: {doc.aiAnalysis.riskLevel === 'low' ? 'Faible' : doc.aiAnalysis.riskLevel === 'medium' ? 'Modéré' : 'Élevé'}
                            </Badge>
                          </>
                        )}
                        {doc.status === 'error' && (
                          <>
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600">Erreur de traitement</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDocument(doc.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {(doc.status === 'uploading' || doc.status === 'processing') && (
                  <div className="mt-3">
                    {doc.status === 'uploading' ? (
                      <Progress value={doc.uploadProgress} className="mt-3" />
                    ) : (
                      /* Document Card Scanning Animation */
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs text-text-muted">
                          <span>Scan du document...</span>
                          <span className="animate-pulse">●●●</span>
                        </div>
                        
                        {/* Document Card Animation */}
                        <div className="relative bg-white border-2 border-gray-200 rounded-lg p-4 h-32 overflow-hidden">
                          {/* Mock document content */}
                          <div className="space-y-2">
                            <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-2 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                            <div className="h-2 bg-gray-300 rounded w-1/3"></div>
                            <div className="h-2 bg-gray-300 rounded w-3/5"></div>
                          </div>
                          
                          {/* Vertical scanning line */}
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-80 animate-[slide-down_4s_ease-in-out_infinite]"></div>
                          </div>
                          
                          {/* Extraction particles animation */}
                          <div className="absolute top-2 right-2 space-y-1">
                            <div className="w-1 h-1 bg-green-400 rounded-full animate-[float-right_2s_ease-out_infinite_0.5s] opacity-0"></div>
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-[float-right_2s_ease-out_infinite_1s] opacity-0"></div>
                            <div className="w-1 h-1 bg-purple-400 rounded-full animate-[float-right_2s_ease-out_infinite_1.5s] opacity-0"></div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <span className="text-xs text-yellow-600 animate-pulse">
                            Extraction des données en cours...
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardHeader>

              {doc.status === 'completed' && (
                <CardContent className="space-y-4 animate-fade-in">
                  {/* AI Analysis Summary */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-purple-800">Analyse IA</h4>
                      <Badge variant="outline" className="text-purple-700 border-purple-300">
                        {doc.aiAnalysis.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-purple-700 mb-3">{doc.aiAnalysis.summary}</p>
                    
                    {/* Key Findings */}
                    <div className="mb-3">
                      <h5 className="font-medium text-purple-800 mb-2">Résultats clés:</h5>
                      <ul className="text-sm text-purple-700 space-y-1">
                        {doc.aiAnalysis.keyFindings.map((finding, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-3 h-3 mt-1 text-green-600 flex-shrink-0" />
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Medical Terms */}
                    <div className="mb-3">
                      <h5 className="font-medium text-purple-800 mb-2">Termes médicaux détectés:</h5>
                      <div className="flex flex-wrap gap-1">
                        {doc.aiAnalysis.medicalTerms.map((term, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {term}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h5 className="font-medium text-purple-800 mb-2">Recommandations:</h5>
                      <ul className="text-sm text-purple-700 space-y-1">
                        {doc.aiAnalysis.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertCircle className="w-3 h-3 mt-1 text-yellow-600 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  {/* OCR Text */}
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Scan className="w-5 h-5 text-gray-600" />
                      <h4 className="font-semibold text-text-primary">Texte extrait (OCR)</h4>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                        {doc.ocrText}
                      </pre>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Aperçu
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="w-16 h-16 mx-auto text-text-subtle mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              Aucun Document Trouvé
            </h3>
            <p className="text-text-secondary mb-4">
              Téléchargez des résultats d'analyses, des scanners, des lettres de référence et autres documents médicaux
            </p>
            <Button 
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Télécharger Votre Premier Document
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Formats supportés:</strong> PDF, Images (JPG, PNG), Documents Word, Excel.
          Les documents seront automatiquement analysés par OCR et IA pour extraire les informations médicales pertinentes.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PatientDocuments;
