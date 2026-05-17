import { Mail, MapPin, Phone, Wallet } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

export function Vizitka({ lecturerData }) {
  const name = lecturerData.first_name;
  const mid_name = lecturerData.middle_name;
  const surname = lecturerData.last_name;
  const title_b = lecturerData.title_before;
  const title_a = lecturerData.title_after;
  const pic_url = lecturerData.picture_url;
  const cena = lecturerData.price_per_hour;
  const tagy = lecturerData.tags || [];
  const location = lecturerData.location;
  const claim = lecturerData.claim;
  const telephone_numbers = lecturerData.contact?.telephone_numbers || [];
  const emails = lecturerData.contact?.emails || [];

  return (
    <Card className="h-full">
      <CardContent className="space-y-4 pt-6">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="aspect-square w-full max-w-[160px] overflow-hidden rounded-lg bg-muted">
            <img src={pic_url} alt={`${name} ${surname}`} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <div>
              <h2 className="font-display text-2xl text-foreground">
                {title_b} {name} {mid_name} {surname} {title_a}
              </h2>
              <p className="text-sm text-muted-foreground">{claim}</p>
            </div>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4" /> {cena} Kč / 60 min
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {location}
              </div>
              <div className="flex flex-wrap gap-3">
                {telephone_numbers.slice(0, 2).map((element) => (
                  <span key={element} className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${element}`} className="underline">
                      {element}
                    </a>
                  </span>
                ))}
                {emails.slice(0, 2).map((element) => (
                  <span key={element} className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${element}`} className="underline">
                      {element}
                    </a>
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {tagy.map((tag) => (
                <Badge key={tag.uuid} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button asChild>
          <a href={`/lecturer/${lecturerData.uuid}`}>Více</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
