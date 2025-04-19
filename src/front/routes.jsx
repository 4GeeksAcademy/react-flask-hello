export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Todas las rutas públicas deben estar dentro de PublicLayout */}
      <Route path="/" element={<PublicLayout />} errorElement={<h1>Not found!</h1>}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="quotehistory" element={<QuoteHistory />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="contacto" element={<Contact />} />
        <Route path="servicios" element={<WeOffer />} />
        <Route path="nosotros" element={<AboutUs />} />
      </Route>

      {/* Rutas privadas */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
        errorElement={<h1>Not found!</h1>}
      >
        <Route path="dashboard" element={<Dash_user />} />
        <Route path="dash_admin" element={<Dash_admin />} />
        <Route path="plot_form" element={<Plot_form />} />
        <Route path="quote" element={<Quote />} />
        <Route path="pdfdocument" element={<PdfDocument />} />
        <Route path="pdfdocumentwrapper" element={<PdfDocumentWrapper />} />
      </Route>

      {/* Redirección para 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);