import { create } from "zustand";
import { supabase } from "../index";

export const useAuth = create((set) => ({
  /* ================= GOOGLE ================= */
  loginGoogle: async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  },

  /* ================= USERNAME + PASSWORD ================= */
  loginUsernamePassword: async (username, password) => {
    // 1️⃣ Buscar email por username
    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("username", username)
      .single();

    if (error || !data) {
      throw new Error("Usuario no encontrado");
    }

    // 2️⃣ Login normal de Supabase
    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email: data.email,
        password,
      });

    if (loginError) {
      throw new Error("Contraseña incorrecta");
    }
  },

  /* ================= LOGOUT ================= */
  cerrarSesion: async () => {
    await supabase.auth.signOut();
  },
}));
