"use client";
import type React from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { IconCandado, IconLoad, IconUser, IconVisibility, IconVisibilityOff } from "@/components/icons";
// import { IconFacebook, IconGoogle } from "@/components/icons";

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulación de autenticación
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Login attempt:", formData);
    } catch (err) {
      setError(`Error al iniciar sesión. Verifica tus credenciales. ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      {/* Card Container */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
            ¡Bienvenid@!
          </h1>
          <p className="text-slate-600">Inicia sesión en tu cuenta</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-4">
            <Label htmlFor="email" className="">
              Correo electrónico
            </Label>
            <div className="relative">
              {/* Email Icon */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
								<IconUser width={18} height={18} className="text-slate-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={formData.email}
                onChange={handleInputChange}
                className="pl-10 h-12 "
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-4">
            <Label htmlFor="password" className="">
              Contraseña
            </Label>
            <div className="relative">
              {/* Lock Icon */}
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <IconCandado width={16} height={16} className="text-slate-400" />
              </div>
              
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="pl-10 pr-10 h-12 "
                required
              />

              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-black transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <IconVisibility width={18} height={18} />
                ) : (
                  <IconVisibilityOff width={18} height={18} />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" className="w-full h-12 bg-gradient-to-r from-blue-600 hover:from-blue-700 to-teal-500 hover:to-teal-600 transition-colors duration-300 py-2 rounded-xl text-white font-semibold cursor-pointer" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center text-white">
                <IconLoad width={20} height={20} className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" />
                Iniciando sesión...
              </div>
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        {/* Divider */}

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-4">
          <div className="w-full border-t border-slate-200"></div>

          <button className="text-sm text-slate-600 hover:text-black transition-colors cursor-pointer">
            ¿Olvidaste tu contraseña?
          </button>

          {/* Divider */}

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-base">
              <span className="bg-white px-2 text-slate-500">
                O continúa con
              </span>
            </div>
          </div> */}

          {/* Social Buttons */}
          {/* <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-10 bg-transparent space-x-2">
							<IconGoogle width={16} height={16} />
              <p>Google</p>
            </Button>
            <Button variant="outline" className="h-10 bg-transparent space-x-2">
							<IconFacebook width={16} height={16} />
              <p>Facebook</p>
            </Button>
          </div> */}

          {/* Register */}
          {/* <p className="text-sm text-slate-600">
            ¿No tienes cuenta?{" "}
            <button className="font-medium text-slate-900 hover:underline">
              Regístrate aquí
            </button>
          </p> */}
        </div>
      </div>
    </main>
  );
};

export { AuthPage };
