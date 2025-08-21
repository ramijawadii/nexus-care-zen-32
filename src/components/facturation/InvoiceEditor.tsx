import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Save, 
  Send, 
  Printer,
  Mail,
  Download,
  Copy,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  Building2,
  Calculator,
  CreditCard,
  Settings,
  Monitor,
  Smartphone
} from 'lucide-react';

// Import step components
import StepBasicInfo from './InvoiceSteps/StepBasicInfo';
import StepDoctorInfo from './InvoiceSteps/StepDoctorInfo';
import StepClientInfo from './InvoiceSteps/StepClientInfo';
import StepServices from './InvoiceSteps/StepServices';
import StepPayment from './InvoiceSteps/StepPayment';
import StepNotes from './InvoiceSteps/StepNotes';

// Import template preview
import InvoicePreview from './InvoiceTemplates';

const InvoiceEditor = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showPreview, setShowPreview] = useState(true);
  const [saveStatus, setSaveStatus] = useState('saved');
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: 'INV-2024-' + String(Date.now()).slice(-4),
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    template: 'professional',
    language: 'fr',
    currency: 'TND',
    doctorInfo: {
      name: 'Dr. Ahmed Ben Ali',
      specialty: 'Médecin Généraliste',
      address: '123 Avenue Habib Bourguiba, Tunis 1000',
      phone: '+216 71 123 456',
      email: 'dr.benali@cabinet.tn',
      registrationNumber: 'ORD-TN-12345',
      logo: null
    },
    clientInfo: {
      name: '',
      type: 'Particulier',
      address: '',
      phone: '',
      email: '',
      insuranceInfo: '',
      idNumber: '',
      taxNumber: ''
    },
    services: [
      {
        id: 1,
        description: 'Consultation générale',
        quantity: 1,
        unitPrice: 50,
        vatRate: 7,
        discount: 0,
        total: 0
      }
    ],
    paymentMethod: 'Espèces',
    paymentTerms: 'Payable à réception',
    bankDetails: {
      bankName: 'Banque de Tunisie',
      accountNumber: 'TN59 1000 6035 0359 9000 6014',
      swift: 'BTSTTNT1XXX'
    },
    notes: '',
    privateNotes: '',
    status: 'Brouillon',
    discount: {
      type: 'percentage',
      value: 0
    },
    tax: {
      includeVAT: true,
      vatNumber: 'TN-1234567-ABC',
      defaultVatRate: 7,
      includeFiscalStamp: true,
      fiscalStampAmount: 0.600,
      fiscalStampType: 'fixed'
    }
  });

  const steps = [
    { id: 0, title: 'Configuration', icon: Settings, component: StepBasicInfo },
    { id: 1, title: 'Cabinet', icon: Building2, component: StepDoctorInfo },
    { id: 2, title: 'Client', icon: User, component: StepClientInfo },
    { id: 3, title: 'Services', icon: Calculator, component: StepServices },
    { id: 4, title: 'Paiement', icon: CreditCard, component: StepPayment },
    { id: 5, title: 'Notes', icon: FileText, component: StepNotes }
  ];

  const validateInvoice = () => {
    const errors = [];
    if (!invoiceData.clientInfo.name) errors.push('Nom du client requis');
    if (invoiceData.services.some(s => !s.description)) errors.push('Description des services requise');
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSave = async () => {
    if (validateInvoice()) {
      setSaveStatus('saving');
      setTimeout(() => {
        setSaveStatus('saved');
        setHasUnsavedChanges(false);
        console.log('Invoice saved:', invoiceData);
      }, 1000);
    }
  };

  const handleSend = () => {
    if (validateInvoice()) {
      console.log('Sending invoice:', invoiceData);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF...');
  };

  const duplicateInvoice = () => {
    setInvoiceData({
      ...invoiceData,
      invoiceNumber: 'INV-2024-' + String(Date.now()).slice(-4),
      date: new Date().toISOString().split('T')[0],
      status: 'Brouillon'
    });
    setSaveStatus('modified');
    setHasUnsavedChanges(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Payée': return 'bg-green-100 text-green-800 border-green-200';
      case 'Envoyée': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'En retard': return 'bg-red-100 text-red-800 border-red-200';
      case 'Annulée': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDataChange = (newData) => {
    setInvoiceData(prev => ({ ...prev, ...newData }));
    setHasUnsavedChanges(true);
    setSaveStatus('modified');
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="h-full flex flex-col bg-blue-50">
      {/* Header - matching BookingPageBuilder style */}
      <div className="border-b bg-blue-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Éditeur de Facture Professionnel
              </h1>
              <p className="text-sm text-gray-600">
                Créez et gérez vos factures facilement
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Device Preview Toggle */}
            <div className="flex items-center border rounded-lg p-1 bg-white">
              <Button
                variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={previewDevice === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('tablet')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
              <Button
                variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setPreviewDevice('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>

            {/* Preview Mode Toggle */}
            <Button
              variant={showPreview ? 'default' : 'outline'}
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? 'Masquer Aperçu' : 'Aperçu'}
            </Button>

            <Button variant="outline" onClick={duplicateInvoice}>
              <Copy className="w-4 h-4 mr-2" />
              Dupliquer
            </Button>

            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>

            {/* Save Button */}
            <Button 
              variant="outline" 
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
            >
              <Save className="w-4 h-4 mr-2" />
              Sauvegarder
            </Button>

            {/* Send Button */}
            <Button 
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Envoyer
            </Button>
          </div>
        </div>

        {/* Status Bar - matching BookingPageBuilder style */}
        <div className="flex items-center justify-between mt-4 p-3 bg-blue-200/50 rounded-lg">
          <div className="flex items-center gap-4">
            <Badge className={`border ${getStatusColor(invoiceData.status)}`}>
              {invoiceData.status}
            </Badge>
            <span className="text-sm text-gray-600">
              Facture: <span className="font-mono">{invoiceData.invoiceNumber}</span>
            </span>
            <div className="flex items-center text-sm text-gray-500">
              {saveStatus === 'saving' && <div className="flex items-center"><div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>Sauvegarde...</div>}
              {saveStatus === 'saved' && <div className="flex items-center text-green-600"><Check className="w-4 h-4 mr-1" />Sauvegardé</div>}
              {saveStatus === 'modified' && <div className="flex items-center text-orange-600"><AlertCircle className="w-4 h-4 mr-1" />Non sauvegardé</div>}
            </div>
          </div>
          {hasUnsavedChanges && (
            <div className="flex items-center gap-2 text-amber-600">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-sm">Modifications non sauvegardées</span>
            </div>
          )}
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Alert className="m-4 border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <ul className="list-disc list-inside">
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content - matching BookingPageBuilder structure */}
      <div className="flex-1 overflow-hidden bg-blue-50">
        <div className="h-full flex flex-col">
          {/* Step Navigation - matching tabs style */}
          <div className="border-b bg-blue-100 px-6 py-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Étape {currentStep + 1} sur {steps.length}</h3>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Précédent
                </Button>
                <Button 
                  size="sm" 
                  onClick={nextStep}
                  disabled={currentStep === steps.length - 1}
                >
                  Suivant
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            
            {/* Progress Steps - matching tabs design */}
            <div className="flex items-center space-x-2 overflow-x-auto bg-white rounded-md p-1">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors whitespace-nowrap text-sm font-medium ${
                      index === currentStep
                        ? 'bg-blue-500 text-white shadow-sm'
                        : index < currentStep
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    <span>{step.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto bg-blue-50">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Editor Panel */}
              <ResizablePanel defaultSize={showPreview ? 40 : 100} minSize={30}>
                <div className="h-full overflow-y-auto p-6">
                  <div className="max-w-2xl mx-auto">
                    <CurrentStepComponent 
                      invoiceData={invoiceData}
                      setInvoiceData={handleDataChange}
                      setSaveStatus={setSaveStatus}
                    />
                  </div>
                </div>
              </ResizablePanel>

              {showPreview && (
                <>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={60} minSize={40}>
                    <div className="h-full overflow-y-auto bg-gray-100 p-6">
                      <div className={`mx-auto transition-all duration-300 ${
                        previewDevice === 'desktop' ? 'max-w-4xl' :
                        previewDevice === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
                      }`}>
                        <InvoicePreview 
                          invoiceData={invoiceData} 
                          template={invoiceData.template} 
                        />
                      </div>
                    </div>
                  </ResizablePanel>
                </>
              )}
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceEditor;
