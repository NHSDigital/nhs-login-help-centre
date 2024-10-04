import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TextBox } from '../src/app/_components/text-box';
import React from 'react';

describe('TextBox', () => {
  it('renders correctly', () => {
    const { container } = render(<TextBox />);

    expect(container).toMatchInlineSnapshot(`
<div>
  <div>
    <textarea
      aria-describedby="message-detail-hint"
      class="nhsuk-textarea nhs-help-centre__form-control-input"
      id="message-detail"
      maxlength="1500"
      name="message-detail"
      rows="6"
    />
    <div
      class="nhsuk-hint nhsuk-character-count__message"
      id="message-detail-count"
    >
      You have 
      <span
        id="remaining-characters"
      >
        1500
      </span>
       characters remaining
    </div>
  </div>
</div>
`);
  });

  it('displays the remaining characters correctly when empty', () => {
    const { getByText } = render(<TextBox />);
    expect(getByText('1500')).toBeInTheDocument();
  });

  it('displays the remaining characters correctly with user input', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<TextBox />);
    await user.type(getByRole('textbox'), 'Hello!');
    expect(getByRole('textbox')).toHaveValue('Hello!');
    expect(getByText('1494')).toBeInTheDocument();
  });
});
