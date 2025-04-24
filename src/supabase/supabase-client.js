import { createClient } from "@supabase/supabase-js";

export class Supabase {
  supabaseClient;
  constructor() {
    this.supabaseClient = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );
  }
  async signUp(email, password, name) {
    try {
      const { data, error } = await this.supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.log("Error in Sign Up : ", error.message);
    }
  }

  async signIn(email, password) {
    try {
      const { data, error } = await this.supabaseClient.auth.signInWithPassword(
        email,
        password
      );
      if (error) throw error;
      return data;
    } catch (error) {
      console.log("Error in Sign In : ", error.message);
    }
  }

  async getCurrentSession() {
    try {
      const { data, error } = await this.supabaseClient.auth.getSession();
      if (error) throw error;
      return data.session;
    } catch (error) {
      console.error("Error with get session", error.message);
    }
  }

  async logOut() {
    try {
      const { error } = await this.supabaseClient.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Log out error:", error.message);
    }
  }
}

const supabase = new Supabase();
export default supabase;
