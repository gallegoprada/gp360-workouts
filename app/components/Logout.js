import { createClient } from "../utils/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function Logout({className}){
    const supabase = createClient();
    const {data} = await supabase.auth.getUser();

    if (data.user){
        return (
            <div className={`${className} md:flex ml-auto justify-between items-end float-right`}>
                <LogoutButton />
            </div>
        )
    }
}