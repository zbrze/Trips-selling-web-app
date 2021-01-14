
export class User{
    uid: string;
    email: string;
    displayName: string;
    role: Roles;
}
export interface Roles { 
    reader: boolean;
    vip: boolean;
    editor: boolean;
    admin: boolean;
 }