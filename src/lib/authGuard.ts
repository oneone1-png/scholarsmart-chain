import {supabase} from "@/lib/supabase";

export async function requireUser(router:any) {
    const{
        data : {user},
    } = await supabase.auth.getUser();

    if (!user) {
        router.pish("/login");
        return null;
    }

    return user;
    
}