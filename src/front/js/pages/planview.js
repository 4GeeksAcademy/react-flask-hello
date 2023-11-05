import React from 'react';

const MembershipPlans = () => {
  return (
    <div className="container" id="plans" style={{ marginBottom: '150px', marginTop: '150px' }}>
      <h1 className="my-4" style={{ fontSize: '3rem' }}>
        <strong> Membership <span style={{"color":"#FD5812"}}>Plans</span></strong>
      </h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card shadow" style={{ backgroundColor: '#FFDAB9' }}>
            <div className="card-header">
              <h5>Free Componentify</h5>
            </div>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">$9.99/month</h6>
              <p>Access to basic content</p>
              <p>No support</p>
              <p>No ad-free experience</p>
              <button className="btn btn-success">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow" style={{ backgroundColor: '#FFB93E' }}>
            <div className="card-header">
              <h5>Pro Componentify</h5>
            </div>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">$19.99/month</h6>
              <p>Access to premium content</p>
              <p>Priority support</p>
              <p>Ad-free experience</p>
              <button className="btn btn-success">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow" style={{ backgroundColor: '#FFA55E' }}>
            <div className="card-header">
              <h5>Premium Componentify</h5>
            </div>
            <div className="card-body">
              <h6 className="card-subtitle mb-2 text-muted">$29.99/month</h6>
              <p>Access to all content</p>
              <p>VIP support</p>
              <p>Ad-free experience</p>
              <button className="btn btn-success">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPlans;
