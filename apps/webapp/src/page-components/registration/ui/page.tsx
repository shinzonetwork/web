import {
  RegistrationForm,
  useRegistrationForm,
} from "@/features/registration-form";
import { useRegistrationTransaction } from "@/features/registration-form/hooks/use-registration-transaction";
import {
  getRegistrationButtonText,
  validateRegistrationForm,
  validateRequiredFields,
} from "@/shared/lib";
import { Button } from "@/shared/ui/button";

export default function Registration() {
  const { formData, handleInputChange, handleUserRoleChange } =
    useRegistrationForm();

  const {
    sendRegisterTransaction,
    isPending,
    isConfirming,
    isConfirmed,
    sendError,
  } = useRegistrationTransaction(formData);

  const handleRegister = async () => {
    // Validate inputs before sending transaction
    const { isValid, errors } = validateRequiredFields(formData);
    if (!isValid) {
      alert(errors.join("\n"));
      return;
    }

    try {
      await sendRegisterTransaction();
    } catch (error) {
      // Error is already handled in the hook
      console.error("Registration failed:", error);
    }
  };

  const isRegistrationDisabled = !validateRegistrationForm(formData);

  return (
    <div className="space-y-6 mx-12 my-12">
      <div className="space-y-2">
        <h3 className="text-3xl font-bold">Configuration</h3>
        <p className="text-base leading-relaxed text-muted-foreground">
          Subtext on why we need this configuration information.
        </p>
      </div>
      <RegistrationForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleUserRoleChange={handleUserRoleChange}
      />
      <Button
        onClick={handleRegister}
        className="w-full"
        disabled={isRegistrationDisabled || isPending || isConfirming}
      >
        {getRegistrationButtonText(isPending, isConfirming, isConfirmed)}
      </Button>

      {sendError && (
        <div className="text-sm text-destructive mt-2">
          Error: {sendError.message}
        </div>
      )}
    </div>
  );
}
