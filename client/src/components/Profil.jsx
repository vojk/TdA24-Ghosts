import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { ArrowLeft, Mail, MapPin, Phone, Wallet } from "lucide-react";
import FadeInView from "./FadeInView";
import ReserveBox from "./ReserveBox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

export function Profil() {
  const { UUID } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    async function fetchData() {
      let exception = false;
      try {
        const response = await fetch(
          `http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/${UUID}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("fetch:", error);
        setLoading(2);
        exception = true;
      }
      if (!exception) {
        setLoading(0);
      }
    }
    fetchData();
  }, [UUID]);

  if (loading === 1) {
    return (
      <FadeInView>
        <div className="py-12 text-center font-display text-white">Vydržte, než se stránka připraví.</div>
      </FadeInView>
    );
  }
  if (loading === 2) {
    return (
      <FadeInView>
        <div className="py-12 text-center font-display text-white">
          Nepodařilo se nám získat data požadovaného lektora.
        </div>
      </FadeInView>
    );
  }

  if (loading === 0) {
    const name = data.first_name;
    const mid_name = data.middle_name;
    const surname = data.last_name;
    const title_b = data.title_before;
    const title_a = data.title_after;
    const pic_url = data.picture_url;
    const cena = data.price_per_hour;
    const tags = data.tags || [];
    const location = data.location;
    const claim = DOMPurify.sanitize(data.claim);
    const bio = DOMPurify.sanitize(data.bio);
    const telephone_numbers = data.contact?.telephone_numbers || [];
    const emails = data.contact?.emails || [];

    return (
      <FadeInView>
        <div className="container py-12">
          <Button variant="outline" size="sm" asChild className="mb-6">
            <Link to="/lecturers" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Zpět
            </Link>
          </Button>

          <Card>
            <CardContent className="space-y-8 pt-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="flex flex-1 flex-col gap-4">
                  <div>
                    <h1 className="font-display text-4xl text-foreground">
                      {title_b} {name} {mid_name} {surname} {title_a}
                    </h1>
                    <p className="mt-2 text-muted-foreground" dangerouslySetInnerHTML={{ __html: claim }} />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={tag.uuid} variant={index % 2 === 0 ? "secondary" : "outline"}>
                        {tag.name}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> {location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" /> {cena} Kč / 60 min
                    </div>
                    <div className="flex flex-col gap-2">
                      {telephone_numbers.map((element) => (
                        <span key={element} className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{element}</span>
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      {emails.map((element) => (
                        <span key={element} className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{element}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Avatar className="h-40 w-40">
                  <AvatarImage src={pic_url} alt={`Picture of ${name}`} />
                  <AvatarFallback>{name?.[0]}</AvatarFallback>
                </Avatar>
              </div>

              <Separator />

              <div>
                <h2 className="font-display text-2xl text-foreground">Něco o mně</h2>
                <div className="text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: bio }} />
              </div>

              <div className="flex justify-center">
                <ReserveBox tags={tags} cena={cena} />
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeInView>
    );
  }
}
