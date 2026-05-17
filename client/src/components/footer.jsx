import { Link } from "react-router-dom";
import { ReactComponent as TdALogo } from "./../TdA/TdA_LOGO/TeacherDigitalAgency_LOGO_white.svg";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

function MenuItem({ text, to }) {
  return (
    <Button variant="link" asChild className="text-muted-foreground">
      <Link to={to}>{text}</Link>
    </Button>
  );
}

export default function Footer() {
  return (
    <>
      <footer className="border-t bg-background">
        <div className="container py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <TdALogo className="h-10 w-auto" />
              <div>
                <p className="font-display text-lg">Teacher Digital Agency</p>
                <p className="text-sm text-muted-foreground">Spojujeme lektory se studenty.</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground md:items-end">
              <div className="flex flex-wrap gap-3">
                <MenuItem to="/about" text="O TdA" />
                <MenuItem to="/lecturers" text="Lektoři" />
              </div>
              <Separator className="hidden md:block" />
              <span>Copyright © Teacher Digital Agency 2024</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
