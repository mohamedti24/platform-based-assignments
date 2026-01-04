const API='http://localhost:5000/api';
export async function api(endpoint:string,method='GET',body?:any,token?:string){
 const res=await fetch(API+endpoint,{
  method,
  headers:{'Content-Type':'application/json',...(token&&{Authorization:`Bearer ${token}`})},
  body: body?JSON.stringify(body):undefined
 });
 const data=await res.json();
 if(!res.ok) throw new Error(data.message||'Error');
 return data;
}