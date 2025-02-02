import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Briefcase, CalendarDays, MapPin, RadioTower } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MouseEvent, MouseEventHandler } from "react";

type JobType = {
  name?: string;
  project: { name: string; url: string; onClick?: () => void };
  year?: string;
  list?: Array<string>;
};

function JobCard(job: JobType) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (job.project?.onClick) {
      job.project?.onClick();
      e.preventDefault();
    }
  };
  return (
    <Card className="bg-muted w-96">
      <CardHeader>
        <Button variant="link" asChild>
          <Link
            className="text-xl"
            href={job.project.url}
            onClick={handleClick}
          >
            {job.project.name}
          </Link>
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 flex gap-4">
        {job?.name && (
          <div className="flex gap-x-2 items-center">
            <Briefcase />
            {job.name}
          </div>
        )}
        {job?.year && (
          <div className="flex gap-x-2 items-center">
            <CalendarDays />
            {job.year}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-4">
        {job?.list && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="techstack">
              <AccordionTrigger>TechStack</AccordionTrigger>
              <AccordionContent>
                <ul>
                  {job?.list?.map((item) => (
                    <li
                      className="text-left"
                      key={`${job.project.name}_${item}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardFooter>
    </Card>
  );
  return <h1 className="text-4xl">JobCard</h1>;
}

export default JobCard;
