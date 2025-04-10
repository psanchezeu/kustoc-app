
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export interface PlanSelectionFormProps {
  selectedPlan: "normal" | "premium" | null;
  handlePlanSelect: (plan: "normal" | "premium") => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

export const PlanSelectionForm = ({
  selectedPlan,
  handlePlanSelect,
  handleNextStep,
  handlePreviousStep,
}: PlanSelectionFormProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Selecciona tu Plan</h2>
        <p className="text-muted-foreground">
          Elige el tipo de prototipo que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md ${
            selectedPlan === "normal" ? "border-bloodRed bg-red-50/50" : ""
          }`}
          onClick={() => handlePlanSelect("normal")}
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Prototipo Normal</h3>
            <div className="text-3xl font-bold">100 €</div>
            <p className="text-muted-foreground mt-1">Entrega en 6 días</p>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
              <span>Prototipo funcional básico</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
              <span>Chat de soporte 5/7</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
              <span>1 revisión incluida</span>
            </li>
          </ul>
        </div>

        <div
          className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-md relative ${
            selectedPlan === "premium" ? "border-bloodRed bg-red-50/50" : ""
          }`}
          onClick={() => handlePlanSelect("premium")}
        >
          <div className="absolute top-0 right-0 bg-bloodRed text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
            Recomendado
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-2">Prototipo Premium</h3>
            <div className="text-3xl font-bold">500 €</div>
            <p className="text-muted-foreground mt-1">Entrega en 10 días</p>
          </div>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
              <span>Prototipo con funcionalidades avanzadas</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
              <span>Chat de soporte 24/7</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
              <span>3 revisiones incluidas</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
              <span>Documentación detallada</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-bloodRed mr-2 shrink-0 mt-0.5" />
              <span>Reunión de presentación</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          onClick={handlePreviousStep}
          className="flex-1"
        >
          Atrás
        </Button>
        <Button
          onClick={handleNextStep}
          className="flex-1 bg-bloodRed hover:bg-red-900"
        >
          Continuar al Pago
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
