"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  radius_mean: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Radius mean must be a number")
    .transform(parseFloat)
    .pipe(z.number().min(5).max(30)),

  texture_mean: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Texture mean must be a number")
    .transform(parseFloat)
    .pipe(z.number().min(5).max(50)),

  perimeter_mean: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Perimeter mean must be a number")
    .transform(parseFloat)
    .pipe(z.number().min(50).max(200)),

  area_mean: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Area mean must be a number")
    .transform(parseFloat)
    .pipe(z.number().min(100).max(2500)),

  smoothness_mean: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Smoothness mean must be a number")
    .transform(parseFloat)
    .pipe(z.number().min(0.05).max(0.2)),

  compactness_mean: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Compactness mean must be a number")
    .transform(parseFloat),
  concavity_mean: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Concavity mean must be a number")
    .transform(parseFloat),
  concave_points_mean: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Concave points mean must be a number")
    .transform(parseFloat),
  symmetry_mean: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Symmetry mean must be a number")
    .transform(parseFloat),
  fractal_dimension_mean: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Fractal dimension mean must be a number")
    .transform(parseFloat),

  radius_se: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Radius SE must be a number")
    .transform(parseFloat),
  texture_se: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Texture SE must be a number")
    .transform(parseFloat),
  perimeter_se: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Perimeter SE must be a number")
    .transform(parseFloat),
  area_se: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Area SE must be a number")
    .transform(parseFloat),
  smoothness_se: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Smoothness SE must be a number")
    .transform(parseFloat),
  compactness_se: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Compactness SE must be a number")
    .transform(parseFloat),
  concavity_se: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Concavity SE must be a number")
    .transform(parseFloat),
  concave_points_se: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Concave points SE must be a number")
    .transform(parseFloat),
  symmetry_se: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Symmetry SE must be a number")
    .transform(parseFloat),
  fractal_dimension_se: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Fractal dimension SE must be a number")
    .transform(parseFloat),

  radius_worst: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Radius worst must be a number")
    .transform(parseFloat),
  texture_worst: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Texture worst must be a number")
    .transform(parseFloat),
  perimeter_worst: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Perimeter worst must be a number")
    .transform(parseFloat),
  area_worst: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Area worst must be a number")
    .transform(parseFloat),
  smoothness_worst: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Smoothness worst must be a number")
    .transform(parseFloat),
  compactness_worst: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Compactness worst must be a number")
    .transform(parseFloat),
  concavity_worst: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Concavity worst must be a number")
    .transform(parseFloat),
  concave_points_worst: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Concave points worst must be a number")
    .transform(parseFloat),
  symmetry_worst: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Symmetry worst must be a number")
    .transform(parseFloat),
  fractal_dimension_worst: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Fractal dimension worst must be a number")
    .transform(parseFloat),
});

const fieldLabels = {
  radius_mean: "Radius Mean",
  texture_mean: "Texture Mean",
  perimeter_mean: "Perimeter Mean",
  area_mean: "Area Mean",
  smoothness_mean: "Smoothness Mean",
  compactness_mean: "Compactness Mean",
  concavity_mean: "Concavity Mean",
  concave_points_mean: "Concave Points Mean",
  symmetry_mean: "Symmetry Mean",
  fractal_dimension_mean: "Fractal Dimension Mean",
  radius_se: "Radius SE",
  texture_se: "Texture SE",
  perimeter_se: "Perimeter SE",
  area_se: "Area SE",
  smoothness_se: "Smoothness SE",
  compactness_se: "Compactness SE",
  concavity_se: "Concavity SE",
  concave_points_se: "Concave Points SE",
  symmetry_se: "Symmetry SE",
  fractal_dimension_se: "Fractal Dimension SE",
  radius_worst: "Radius Worst",
  texture_worst: "Texture Worst",
  perimeter_worst: "Perimeter Worst",
  area_worst: "Area Worst",
  smoothness_worst: "Smoothness Worst",
  compactness_worst: "Compactness Worst",
  concavity_worst: "Concavity Worst",
  concave_points_worst: "Concave Points Worst",
  symmetry_worst: "Symmetry Worst",
  fractal_dimension_worst: "Fractal Dimension Worst",
} as const;

type FormValues = {
  [K in keyof typeof fieldLabels]: string;
};

const Predict = () => {
  const [result, setResult] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(
      Object.keys(fieldLabels).map((key) => [key, ""])
    ) as Partial<z.infer<typeof formSchema>>,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `https://python-backend-9x8w.onrender.com/predict/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      setLoading(false);

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.prediction);
        setConfidence(data.confidence);
      }
    } catch (error) {
      setLoading(false);
      setError((error as Error)?.message || "Something went wrong");
    }
  }

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 justify-start">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {Object.keys(fieldLabels).map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as keyof FormValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {fieldLabels[fieldName as keyof FormValues]}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={`Enter ${
                        fieldLabels[fieldName as keyof FormValues]
                      }`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {error && (
            <div className="p-5 rounded-2xl text-destructive border border-destructive">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={form.formState.isSubmitting || !!error}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Predict"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                form.reset();
                setResult("");
                setConfidence("");
                setError("");
              }}
              disabled={!result}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>

      <div>
        <div className="sticky top-6">
          <h2 className="text-2xl font-bold mb-2">Result</h2>
          {!error && result ? (
            <div
              className={`${
                result === "Benign"
                  ? "text-green-500 border-green-500"
                  : "text-red-500 border-red-500"
              } p-5 border-2 rounded-2xl text-2xl font-bold`}
            >
              <p>{result}</p>
              <p>{confidence}</p>
            </div>
          ) : (
            <p className="text-lg text-muted-foreground">
              Submit to generate a result.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Predict;
