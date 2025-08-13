import { PaymentElement } from '@stripe/react-stripe-js';

const SetupForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default SetupForm;
