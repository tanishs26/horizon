import { createClient } from "@supabase/supabase-js";

export class Supabase {
  supabaseClient;
  constructor() {
    this.supabaseClient = createClient(
      import.meta.env.VITE_SUPABASE_URL,
      import.meta.env.VITE_SUPABASE_KEY
    );
  }
  
  async signUp({email, password, name}) {
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
      return {data,error};
    } catch (error) {
      console.log("Error in Sign Up : ", error.message);
    }
  }

  async signIn({ email, password }) {
    try {
      const { data, error } = await this.supabaseClient.auth.signInWithPassword(
        {
          email,
          password,
        }
      );
      return { data, error };
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
  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await this.supabaseClient.auth.getUser();
      return user;
    } catch (error) {
      console.log("Get current user error:", error);
      throw error;
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
  get auth() {
    return this.supabaseClient.auth;
  }
}

const supabase = new Supabase();
export default supabase;
