export const DEMO_VAULT_KEY='riff-cult-portfolio-vault-v1';
export function parseDemoVault(serialized:string|null,albumIds:string[]):Record<string,string>{
  try{
    const value:unknown=JSON.parse(serialized||'{}');
    if(!value||typeof value!=='object'||Array.isArray(value))return {};
    return Object.fromEntries(Object.entries(value).filter(([id,status])=>albumIds.includes(id)&&(status==='owned'||status==='wishlist')));
  }catch{return {};}
}
