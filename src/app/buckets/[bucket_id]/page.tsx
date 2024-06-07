export const revalidate = 0;
export const dynamic = "force-dynamic";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { getTasksByBucketId } from "@/app/api/tasks/actions";
import NewTaskForm from "@/components/tasks/new-task-form";
import { CustomDialog } from "@/components/ui/custom-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBucketListById } from "../../api/bucket_lists/actions";
import { KanbanBoard } from "@/components/dnd/KanbanBoard";

export default async function BucketPage({
  params,
}: {
  params: { bucket_id: string };
}) {
  const bucket = await getBucketListById(Number(params.bucket_id));

  if (!bucket?.id) return null;

  const bucketTasks = await getTasksByBucketId(bucket.id);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0">
            <div className="flex justify-between p-6">
              <div>
                <CardTitle>{bucket?.name}</CardTitle>
                <CardDescription>{bucket?.description}</CardDescription>
              </div>

              <CustomDialog variant={"default"} cta={"New Task"}>
                <NewTaskForm bucketId={bucket.id} />
              </CustomDialog>
            </div>
            <hr className="mb-7" />
            <CardContent>
              {bucketTasks ? (
                <div>
                  <KanbanBoard tasksData={bucketTasks}/>
                </div>
              ) : (
                <div>
                  No tasks found for this bucket
                </div>
              )}
            </CardContent>
            
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
