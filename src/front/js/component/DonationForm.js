import React from 'react';

const DonationForm = () => {
  return (
    <div className='don my-5'>
      <div className='donate-desc text-center mb-3'>
        <span><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-corner-right-down" width="45" height="45" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#1f1641" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6 6h6a3 3 0 0 1 3 3v10l-4 -4m8 0l-4 4" />
        </svg></span>
      </div>
      <form action="https://www.sandbox.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="hosted_button_id" value="5TSUZQMBTAJYA" />
        <input type="image" src="https://viatesting.files.wordpress.com/2020/03/paypal-donate-button.png?w=640" width="45" height="200" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
      </form>
    </div>

  );
};

export default DonationForm;