export const revalidate = 0;
export const dynamic = "force-dynamic";

import NewBucketForm from "@/components/buckets/new-bucket-form";
import { getBucketLists } from "../api/bucket_lists/actions";
import { CustomDialog } from "@/components/ui/custom-dialog";
import Link from "next/link";

export default async function Buckets() {
  const buckets = await getBucketLists();

  console.log(buckets);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Buckets</h1>
      </div>
      {buckets?.length == 0 ? (
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no buckets
            </h3>
            {/* <p className='text-sm text-muted-foreground'>
                  You can start selling as soon as you add a product.
               </p> */}
            <CustomDialog variant={"default"}>
              <NewBucketForm />
            </CustomDialog>
          </div>
        </div>
      ) : (
        <ul className="grid grid-cols-3">
          {buckets?.map((bucket) => (
            <Link
              href={`/buckets/${bucket.id}`}
              key={bucket.id}
              className="flex flex-col gap-2 rounded border bg-card p-4 drop-shadow-lg"
            >
              <h3 className="text-2xl font-medium">{bucket.name}</h3>
              <p className="text-sm tracking-wider text-slate-600">
                {bucket.description}
              </p>
            </Link>
          ))}
        </ul>
      )}
    </main>
  );
}
