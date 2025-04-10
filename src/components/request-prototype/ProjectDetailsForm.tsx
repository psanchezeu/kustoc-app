
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, ArrowRight } from "lucide-react";

// Feature options data
const features = [
  { id: "auth", label: "Autenticación de usuarios" },
  { id: "chat", label: "Chat / Mensajería" },
  { id: "ai", label: "Inteligencia Artificial" },
  { id: "payments", label: "Pasarela de pagos" },
  { id: "admin", label: "Panel de administración" },
  { id: "notifications", label: "Notificaciones" },
  { id: "crud", label: "CRUD básico" },
  { id: "file_upload", label: "Subida de archivos" },
  { id: "api", label: "Integración con APIs" },
  { id: "real_time", label: "Actualización en tiempo real" },
  { id: "mobile", label: "Diseño responsivo" },
  { id: "analytics", label: "Analítica básica" },
];

// Target audience options data
const targetAudiences = [
  { id: "b2b", label: "B2B - Empresas" },
  { id: "b2c", label: "B2C - Consumidores" },
  { id: "education", label: "Educación" },
  { id: "health", label: "Salud" },
  { id: "finance", label: "Finanzas" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "social", label: "Social" },
  { id: "productivity", label: "Productividad" },
];

export interface ProjectDetailsFormProps {
  formData: {
    projectName: string;
    projectDescription: string;
    additionalInfo: string;
    files: File[];
  };
  selectedFeatures: string[];
  targetAudience: string;
  handleNextStep: () => void;
  setFormData: (formData: any) => void;
  setSelectedFeatures: (features: string[]) => void;
  setTargetAudience: (audience: string) => void;
}

export const ProjectDetailsForm = ({
  formData,
  selectedFeatures,
  targetAudience,
  handleNextStep,
  setFormData,
  setSelectedFeatures,
  setTargetAudience,
}: ProjectDetailsFormProps) => {
  const handleFeaturesChange = (id: string) => {
    setSelectedFeatures(
      selectedFeatures.includes(id)
        ? selectedFeatures.filter((item) => item !== id)
        : [...selectedFeatures, id]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        files: Array.from(e.target.files),
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Información del Proyecto</h2>
        <div>
          <Label htmlFor="projectName">
            Nombre del Proyecto <span className="text-bloodRed">*</span>
          </Label>
          <Input
            id="projectName"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            placeholder="Ej. App de Delivery de Comida"
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="projectDescription">
            Descripción del Proyecto <span className="text-bloodRed">*</span>
          </Label>
          <Textarea
            id="projectDescription"
            value={formData.projectDescription}
            onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
            placeholder="Describe brevemente tu idea, objetivo principal y qué problema resuelve..."
            className="mt-1 min-h-32"
            required
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">
          Funcionalidades <span className="text-bloodRed">*</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Selecciona las funcionalidades que necesitas en tu prototipo (mínimo 1)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${
                selectedFeatures.includes(feature.id)
                  ? "border-bloodRed bg-red-50/50"
                  : "border-border"
              }`}
              onClick={() => handleFeaturesChange(feature.id)}
            >
              <Checkbox
                id={`feature-${feature.id}`}
                checked={selectedFeatures.includes(feature.id)}
                onCheckedChange={() => handleFeaturesChange(feature.id)}
              />
              <label
                htmlFor={`feature-${feature.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
              >
                {feature.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">
          Público Objetivo <span className="text-bloodRed">*</span>
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Selecciona el público principal al que va dirigido tu proyecto
        </p>
        <RadioGroup
          value={targetAudience}
          onValueChange={setTargetAudience}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3"
        >
          {targetAudiences.map((audience) => (
            <div
              key={audience.id}
              className={`border rounded-md p-3 cursor-pointer transition-colors ${
                targetAudience === audience.id
                  ? "border-bloodRed bg-red-50/50"
                  : "border-border"
              }`}
            >
              <RadioGroupItem
                value={audience.id}
                id={`audience-${audience.id}`}
                className="sr-only"
              />
              <label
                htmlFor={`audience-${audience.id}`}
                className="text-sm font-medium flex items-center justify-between cursor-pointer"
              >
                {audience.label}
                {targetAudience === audience.id && (
                  <CheckCircle2 className="h-4 w-4 text-bloodRed" />
                )}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Información Adicional</h3>
        <Textarea
          value={formData.additionalInfo}
          onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
          placeholder="Cualquier detalle adicional que quieras compartir sobre tu proyecto..."
          className="min-h-24"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Adjuntar Archivos</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Opcional: Adjunta imágenes, documentos o bocetos que nos ayuden a entender mejor tu proyecto
        </p>
        <Input
          id="files"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Formatos aceptados: PDF, PNG, JPG, JPEG, SVG (máx. 10MB por archivo)
        </p>
      </div>

      <div className="pt-4">
        <Button
          onClick={handleNextStep}
          className="w-full bg-bloodRed hover:bg-red-900"
        >
          Continuar
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
