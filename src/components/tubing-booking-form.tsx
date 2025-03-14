"use client";

import { useState } from "react";
import { CalendarIcon, Users, Clock, MapPin, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ContentSection from "@/components/content-section.astro";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un email válido.",
  }),
  telefono: z.string().min(8, {
    message: "Por favor ingrese un número de teléfono válido.",
  }),
  fecha: z.date({
    required_error: "Por favor seleccione una fecha para el tour.",
  }),
  horario: z.string({
    required_error: "Por favor seleccione un horario.",
  }),
  adultos: z.string().min(1, {
    message: "Por favor indique el número de adultos.",
  }),
  ninos: z.string().optional(),
  alojamiento: z.string().optional(),
  comentarios: z.string().optional(),
});

export default function TubingBookingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      email: "",
      telefono: "",
      adultos: "2",
      ninos: "0",
      alojamiento: "",
      comentarios: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulación de envío de formulario
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
      }, 3000);
    }, 1500);
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-950 to-blue-800 p-4 md:p-8"
      id="reserva"
    >
      <div className="mx-auto mt-28 w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-bold text-cyan-300 text-4xl md:text-6xl">
            ¡Reserva Tu Aventura!
          </h1>
          <p className="text-white text-xl">
            Completa el formulario para reservar tu tour de tubing en el Río La
            Fortuna
          </p>
        </div>

        {isSuccess ? (
          <Card className="w-full border-cyan-300 bg-white/10 text-white backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-cyan-300 text-2xl">
                ¡Reserva Recibida!
              </CardTitle>
              <CardDescription className="text-white">
                Gracias por tu reserva. Te contactaremos pronto para confirmar
                los detalles.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <Card className="w-full border-cyan-300 bg-white/10 text-white backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-300 text-2xl">
                Formulario de Reserva
              </CardTitle>
              <CardDescription className="text-white">
                Completa todos los campos para asegurar tu lugar en nuestro
                emocionante tour de tubing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="nombre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Juan Pérez"
                              {...field}
                              className="border-cyan-300/50 bg-white/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="ejemplo@correo.com"
                              {...field}
                              className="border-cyan-300/50 bg-white/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="telefono"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Teléfono / WhatsApp</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+506 8888 8888"
                              {...field}
                              className="border-cyan-300/50 bg-white/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fecha"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Fecha del Tour</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "border-cyan-300/50 bg-white/20 pl-3 text-left font-normal text-white",
                                    !field.value && "text-gray-300",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: es })
                                  ) : (
                                    <span>Selecciona una fecha</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto border-cyan-300/50 bg-blue-900 p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className="bg-blue-900 text-white"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="horario"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Horario Preferido</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-cyan-300/50 bg-white/20 text-white">
                                <SelectValue placeholder="Selecciona un horario" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="border-cyan-300/50 bg-blue-900 text-white">
                              <SelectItem value="8:00">8:00 AM</SelectItem>
                              <SelectItem value="10:00">10:00 AM</SelectItem>
                              <SelectItem value="13:00">1:00 PM</SelectItem>
                              <SelectItem value="15:00">3:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="adultos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adultos</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-cyan-300/50 bg-white/20 text-white">
                                  <SelectValue placeholder="Cantidad" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-cyan-300/50 bg-blue-900 text-white">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="ninos"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Niños (6-12 años)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-cyan-300/50 bg-white/20 text-white">
                                  <SelectValue placeholder="Cantidad" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border-cyan-300/50 bg-blue-900 text-white">
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>
                                    {num}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-cyan-100 text-xs">
                              Menores de 6 años no pueden participar por
                              seguridad
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="alojamiento"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Hotel/Alojamiento (Opcional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombre del hotel donde se hospeda"
                              {...field}
                              className="border-cyan-300/50 bg-white/20"
                            />
                          </FormControl>
                          <FormDescription className="text-cyan-100 text-xs">
                            Para coordinar el transporte si es necesario
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="comentarios"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Comentarios o Solicitudes Especiales
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Información adicional que debamos saber..."
                            className="resize-none border-cyan-300/50 bg-white/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start space-x-2 text-sm">
                      <div className="grid gap-1.5 leading-none">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-cyan-300" />
                          <p className="font-medium leading-none text-sm">
                            Punto de encuentro: Oficina central en La Fortuna
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <div className="grid gap-1.5 leading-none">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-cyan-300" />
                          <p className="font-medium leading-none text-sm">
                            Duración: Aproximadamente 2.5 horas
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <div className="grid gap-1.5 leading-none">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-cyan-300" />
                          <p className="font-medium leading-none text-sm">
                            Incluye: Equipo de seguridad, guía y refrigerio
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                      <div className="grid gap-1.5 leading-none">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-cyan-300" />
                          <p className="font-medium leading-none text-sm">
                            Pago: Se confirma la reserva con un depósito del 50%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-cyan-500 text-white hover:bg-cyan-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Reservar Ahora"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 text-center opacity-80 text-sm">
              <p>
                Al enviar este formulario, nos pondremos en contacto contigo
                para confirmar la disponibilidad y el proceso de pago.
              </p>
              <p>
                Para consultas inmediatas: +506 8888-8888 o
                info@tubing-lafortuna.com
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
