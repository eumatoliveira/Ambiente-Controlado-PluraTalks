type ShowPasswordButtonProps = {
  isPasswordVisible: boolean;
  onToggle: () => void;
};

export function ShowPasswordButton({
  isPasswordVisible,
  onToggle,
}: ShowPasswordButtonProps) {
  const accessibleLabel = isPasswordVisible ? 'Ocultar senha' : 'Mostrar senha';
  const VisibilityIcon = isPasswordVisible ? EyeSlashIcon : EyeIcon;

  return (
    <button
      className="password-visibility"
      type="button"
      aria-label={accessibleLabel}
      aria-pressed={isPasswordVisible}
      onClick={onToggle}
    >
      <VisibilityIcon aria-hidden="true" />
    </button>
  );
}
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
