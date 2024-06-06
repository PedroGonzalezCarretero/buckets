export const revalidate = 0;
export const dynamic = "force-dynamic";

import Image from "next/image";
import { File, ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBucketListById } from "../../api/bucket_lists/actions";
import { CustomDialog } from "@/components/ui/custom-dialog";
import NewTaskForm from "@/components/tasks/new-task-form";
import { getTasksByBucketId } from "@/app/api/tasks/actions";
import { Suspense } from "react";

export default async function BucketPage({
  params,
}: {
  params: { bucket_id: string };
}) {
  const bucket = await getBucketListById(Number(params.bucket_id));

  if (!bucket?.id) return null;

  const bucketTasks = await getTasksByBucketId(bucket.id);
  console.log(bucketTasks);

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
            <CardHeader>
              <div>
                <CardTitle>{bucket?.name}</CardTitle>
                <CardDescription>{bucket?.description}</CardDescription>
              </div>

              <CustomDialog variant={"default"} cta={"New Task"}>
                <NewTaskForm bucketId={bucket.id} />
              </CustomDialog>
            </CardHeader>
            <hr className="mb-7" />
            <CardContent>
              <h4 className="mb-3 text-xl">Tasks</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Total Sales
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created at
                    </TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <Suspense fallback={<div>Loading...</div>}>
                  <TableBody>
                    {bucketTasks?.map((task) => {
                      console.log(task);
                      return (
                        <TableRow key={task.id}>
                          <TableCell className="font-medium">
                            {task.description}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {task.completed ? "Completed" : "Uncompleted"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            $499.99
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            25
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-07-12 10:42 AM
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Suspense>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
