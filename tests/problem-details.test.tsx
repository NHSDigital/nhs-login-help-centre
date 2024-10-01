// // import renderer from 'react-test-renderer';
// import {RadioItem} from '../src/app/_components/problem-details-form';
// import {render, screen} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom'

// test('loads and displays greeting', async () => {
//     // ARRANGE
//     render(<RadioItem inputId="visitNHS" name="visit" value="visit_nhs_app"> NHS App </RadioItem>)

//     // ACT
//     await userEvent.click(screen.getByText('Load Greeting'))
//     await screen.findByRole('heading')

//   // ASSERT
//     // expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//     // expect(screen.getByRole('button')).toBeUndefined
// })


// describe('Problem details form', () => {
//     it('renders correctly', () => {
//     const tree = renderer
//         .create(<ProblemDetailsForm></ProblemDetailsForm>)
//         .toJSON();
//     expect(tree).toMatchSnapshot();
//     });
// });

// describe('RadioItem', () => {
//     it('renders correctly', () => {
//     const tree = renderer
//         .create(<RadioItem inputId="visitNHS" name="visit" value="visit_nhs_app"> NHS App </RadioItem>)
//         .toJSON();
//     expect(tree).toMatchSnapshot();
//     });
// });

import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Fetch from './fetch'

test('loads and displays greeting', async () => {
  // ARRANGE
  render(<Fetch url="/greeting" />)

  // ACT
  await userEvent.click(screen.getByText('Load Greeting'))
  await screen.findByRole('heading')

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent('hello there')
  expect(screen.getByRole('button')).toBeDisabled()
})
