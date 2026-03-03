import { create } from "zustand";
import { supabase } from "../index";

export const useAuth = create((set) => ({
  loginGoogle: async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  },

  loginUsernamePassword: async (username, password) => {
    
    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("username", username)
      .single();

    if (error || !data) {
      throw new Error("Usuario no encontrado");
    }

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password,
      });

    if (loginError) {
      throw new Error("Contraseña incorrecta");
    }
  },

  cerrarSesion: async () => {
    await supabase.auth.signOut();
  },
}));
