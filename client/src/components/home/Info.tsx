import { CheckCircle } from "lucide-react";

interface InfoProps {
  title: string;
  description: string;
}

const Info = (props: InfoProps) => {
  return (
    <div>
      <div className="flex gap-3 items-center mb-1">
        <CheckCircle className="text-primary size-5" />
        <p>{props.title}</p>
      </div>
      <p className="text-sm text-muted-foreground ">{props.description}</p>
    </div>
  );
};

export default Info;
