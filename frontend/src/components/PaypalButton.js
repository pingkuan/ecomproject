import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { payOrder } from '../actions/orderActions';
import { useDispatch } from 'react-redux';

const PaypalButton = ({ clientId, price, showSpinner, orderId }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const reduxDispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        'client-id': clientId,
      },
    });
  }, [clientId, showSpinner]);

  const handleApprove = (approveOrder) => {
    reduxDispatch(payOrder(orderId, approveOrder));
  };

  return (
    <>
      {showSpinner && isPending && <div className='spinner' />}
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price,
                  currency_code: 'TWD',
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const successOrder = await actions.order.capture();
          handleApprove(successOrder);
        }}
      />
    </>
  );
};

export default PaypalButton;
