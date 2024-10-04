import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { RadioItem} from '../src/app/_components/radio-item';

describe('RadioItem', () => {
  it('renders correctly', () => {
    const { container } = render(
      <RadioItem inputId="visitNHS" name="visit" value="visit_nhs_app">
        NHS App
      </RadioItem>
    );

    expect(container).toMatchInlineSnapshot(`
<div>
  <div
    class="nhsuk-radios__item"
  >
    <input
      class="nhsuk-radios__input nhs-help-centre__form-control-input"
      id="visitNHS"
      name="visit"
      type="radio"
      value="visit_nhs_app"
    />
    <label
      class="nhsuk-label nhsuk-radios__label"
      for="visitNHS"
    >
      NHS App
    </label>
  </div>
</div>
`);
  });
  it('displays the label text correctly', () => {
    const { getByLabelText } = render(
      <RadioItem inputId="visitNHS" name="visit" value="visit_nhs_app">
        NHS App
      </RadioItem>
    );
    expect(getByLabelText('NHS App')).toBeInTheDocument();
  });
});
