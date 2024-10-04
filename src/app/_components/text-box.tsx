import { useState } from "react";

export function TextBox() {
  const [characterCount, setCharacterCount] = useState(0);
  return (
    <div>
      <textarea
        className="nhsuk-textarea nhs-help-centre__form-control-input"
        id="message-detail"
        name="message-detail"
        rows={6}
        onChange={e => setCharacterCount(e.target.value.length)}
        aria-describedby="message-detail-hint"
        maxLength={1500}
      ></textarea>
      <div className="nhsuk-hint nhsuk-character-count__message" id="message-detail-count">
        You have <span id="remaining-characters">{1500 - characterCount}</span> characters remaining
      </div>
    </div>
  );
}
