type RadioItemProps = { inputId: string; value: string; name: string };

export function RadioItem({ inputId, value, name, children }: React.PropsWithChildren<RadioItemProps>) {
  return (
    <div className="nhsuk-radios__item">
      <input
        className="nhsuk-radios__input nhs-help-centre__form-control-input"
        id={inputId}
        name={name}
        type="radio"
        value={value}
      />
      <label className="nhsuk-label nhsuk-radios__label" htmlFor={inputId}>
        {children}
      </label>
    </div>
  );
}
