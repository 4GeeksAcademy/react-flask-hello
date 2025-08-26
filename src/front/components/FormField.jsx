export default function FormField({label,children,error}){
  return (
    <div style={{marginBottom:12}}>
      <label style={{display:"block",fontWeight:600,marginBottom:6}}>{label}</label>
      {children}
      {error && <div style={{color:"#b91c1c",fontSize:12,marginTop:4}}>{error}</div>}
    </div>
  );
}