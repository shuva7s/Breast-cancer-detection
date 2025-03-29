import Predict from "@/components/Predict";
export default function Home() {
  return (
    <main className="wrapper flex flex-col gap-10 my-10">
      <section>
        <h1 className="text-3xl font-bold">
          Predict if breast cancer is malignant
        </h1>
        <p className="text-lg mt-2 text-muted-foreground">
          Result will be predicted based on historical data of breast cancers.
        </p>
      </section>
      <Predict />
    </main>
  );
}
