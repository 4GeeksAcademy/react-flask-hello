import React from 'react';

const LearnView = () => {
    return (
        <div className="container" id="learn" style={{ marginBottom: '150px', marginTop: '200px' }} >
           <h1 className="my-4" style={{ fontSize: '3rem' }}>
                <strong>How to use <span style={{ color: '#FD5812' }}>  <u>Componentify</u></span></strong>
            </h1>
            <div className="row">
                <div className="col-md-3">
                    <div className="card shadow" style={{ backgroundColor: '#FFDAB9' }}>
                        <div className="card-body">
                            <h5 className="text-left" > <strong> <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-1-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm7.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383h1.312Z"/>
</svg> Download the Installation File</strong></h5>
                            <p className="text-left">To start the installation of [Application Name], you must first download the installation file from the official website.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow" style={{ backgroundColor: '#FFDAB9' }}>
                        <div className="card-body">
                            <h5 ><strong> <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-2-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm4.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306Z"/>
</svg> Run the Installation File</strong></h5>
                            <p>Once you have downloaded the installation file, double-click it to begin the installation process. Follow the on-screen instructions.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow" style={{ backgroundColor: '#FFDAB9' }}>
                        <div className="card-body">
                            <h5><strong> <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-3-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm5.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318Z"/>
</svg> Configure the Application</strong></h5>
                            <p>After installation, you may need to configure the application. This may include creating a user account, setting preferences, and more.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card shadow" style={{ backgroundColor: '#FFDAB9' }}>
                        <div className="card-body">
                            <h5><strong><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-4-square-fill" viewBox="0 0 16 16">
  <path d="M6.225 9.281v.053H8.85V5.063h-.065c-.867 1.33-1.787 2.806-2.56 4.218Z"/>
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm5.519 5.057c.22-.352.439-.703.657-1.055h1.933v5.332h1.008v1.107H10.11V12H8.85v-1.559H4.978V9.322c.77-1.427 1.656-2.847 2.542-4.265Z"/>
</svg> Ready to Use!</strong></h5>
                            <p>Now, [Application Name] is installed and ready for use. Enjoy all the features and functionalities it offers. Enjoy all the features and functionalities it offers.</p>
                        </div>
                    </div>
                </div>
                
                {/* Pregunta sobre si necesita ayuda */}
                {/* <div className="col-md-12 mt-4">
                    <div className="card" style={{ backgroundColor: '#FFDAB9' }}>
                        <div className="card-body">
                            <h4>Did you understand the steps or do you need help?</h4>
                      
                            <button className="btn btn-danger">I need help</button>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default LearnView;
