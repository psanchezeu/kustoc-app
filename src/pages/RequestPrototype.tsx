
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSearchParams, useNavigate } from "react-router-dom";

const RequestPrototype = () => {
  const [searchParams] = useSearchParams();
  const typeFromParams = searchParams.get("type");
  const navigate = useNavigate();
  
  // Always start at step 1
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: typeFromParams || "normal", // Use URL param if available
    projectName: "",
    description: "",
    deadline: "",
    budget: typeFromParams === "premium" ? "3000" : "1500",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect directly to Stripe
    navigate("/payment?amount=" + formData.budget);
  };

  // Step 1: Project Details
  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Paso 1: Detalles del Proyecto</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Tipo de Prototipo</label>
          <div className="flex gap-4">
            <label className={`border rounded-lg p-4 cursor-pointer flex-1 ${
              formData.type === "normal" 
                ? "border-primary bg-primary/5" 
                : "border-border"
            }`}>
              <input 
                type="radio" 
                name="type" 
                value="normal" 
                checked={formData.type === "normal"} 
                onChange={handleInputChange} 
                className="sr-only" 
              />
              <div className="text-center">
                <h3 className="font-medium">Normal</h3>
                <p className="text-sm text-muted-foreground">€1500</p>
                <ul className="text-sm mt-2 text-left">
                  <li>• Hasta 5 pantallas</li>
                  <li>• Diseño básico</li>
                  <li>• 1 revisión</li>
                </ul>
              </div>
            </label>
            
            <label className={`border rounded-lg p-4 cursor-pointer flex-1 ${
              formData.type === "premium" 
                ? "border-primary bg-primary/5" 
                : "border-border"
            }`}>
              <input 
                type="radio" 
                name="type" 
                value="premium" 
                checked={formData.type === "premium"} 
                onChange={handleInputChange} 
                className="sr-only" 
              />
              <div className="text-center">
                <h3 className="font-medium">Premium</h3>
                <p className="text-sm text-muted-foreground">€3000</p>
                <ul className="text-sm mt-2 text-left">
                  <li>• Hasta 10 pantallas</li>
                  <li>• Diseño avanzado</li>
                  <li>• 3 revisiones</li>
                  <li>• Soporte prioritario</li>
                </ul>
              </div>
            </label>
          </div>
        </div>
        
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium mb-1">
            Nombre del Proyecto
          </label>
          <input
            id="projectName"
            name="projectName"
            type="text"
            value={formData.projectName}
            onChange={handleInputChange}
            className="w-full border-border rounded p-2 bg-background"
            required
          />
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full border-border rounded p-2 bg-background"
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={nextStep} className="bg-bloodRed hover:bg-red-900">
          Siguiente
        </Button>
      </div>
    </div>
  );

  // Step 2: Timeline & Budget
  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Paso 2: Plazos y Presupuesto</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium mb-1">
            Fecha límite deseada
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full border-border rounded p-2 bg-background"
          />
        </div>
        
        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-1">
            Presupuesto (€)
          </label>
          <input
            id="budget"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleInputChange}
            className="w-full border-border rounded p-2 bg-background"
            readOnly
          />
          <p className="text-sm text-muted-foreground mt-1">
            Precio fijo basado en el tipo de prototipo seleccionado
          </p>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Atrás
        </Button>
        <Button 
          type="submit"
          onClick={handleSubmit}
          className="bg-bloodRed hover:bg-red-900"
        >
          Proceder al Pago
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container py-8 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Solicitar Prototipo</h1>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
          <div className={`flex flex-col items-center ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              1
            </div>
            <span className="text-xs mt-1">Detalles</span>
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div className={`flex flex-col items-center ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}>
              2
            </div>
            <span className="text-xs mt-1">Presupuesto</span>
          </div>
        </div>
        
        <Card className="p-6">
          <form>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RequestPrototype;
