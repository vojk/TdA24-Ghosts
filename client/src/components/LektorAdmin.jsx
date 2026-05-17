import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import axios from "axios";
import { Mail, MapPin, Phone, Wallet } from "lucide-react";
import ReservedUser from "./ReservedUser";
import FadeInView from "./FadeInView";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";

export default function LektorAdmin() {
  const [date, setDate] = useState(dayjs().toDate());
  const [userId, setUserId] = useState("");
  const [userReservations, setUserReservations] = useState([]);
  const [data, setData] = useState({});
  const [allTags, setAllTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [loading, setLoading] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios({
          method: "post",
          url: "http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/a/id_lektor",
          data: {
            token: localStorage.getItem("token"),
          },
        });
        try {
          const reservationResponse = await axios({
            method: "get",
            url: `http://7d17dc13931b9d11.app.tourdeapp.cz/api/reservation/${response.data}`,
          });
          setUserReservations(reservationResponse.data);
        } catch (error) {
          console.error(error);
        }
        try {
          const lectorResponse = await axios({
            method: "get",
            url: `http://7d17dc13931b9d11.app.tourdeapp.cz/api/lecturers/${response.data}`,
          });
          setData(lectorResponse.data);
        } catch (error) {
          console.error(error);
        }
        setUserId(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTags() {
      let exception = false;
      try {
        const response = await fetch("http://7d17dc13931b9d11.app.tourdeapp.cz/api/tag");
        const result = await response.json();
        setAllTags(result);
        setSelectedTags(data.tags || []);
      } catch (error) {
        console.error("fetch:", error);
        setLoading(2);
        exception = true;
      }
      if (!exception) {
        setLoading(0);
      }
    }
    if (userId) {
      fetchTags();
    }
  }, [userId, data.tags]);

  const stringdate = dayjs(date).format("YYYY-MM-DD");
  const filteredDATA = useMemo(
    () => userReservations.filter((node) => node.date_of_reserv === stringdate),
    [userReservations, stringdate]
  );

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
        <div className="py-12 text-center font-display text-white">Nepodařilo se nám získat data.</div>
      </FadeInView>
    );
  }

  const name = data.first_name;
  const mid_name = data.middle_name;
  const surname = data.last_name;
  const title_b = data.title_before;
  const title_a = data.title_after;
  const pic_url = data.picture_url;
  const cena = data.price_per_hour;
  const tags = data.tags ? data.tags : [];
  const location = data.location;
  const claim = DOMPurify.sanitize(data.claim || "");
  const bio = DOMPurify.sanitize(data.bio || "");
  const telephone_numbers = data.contact ? data.contact.telephone_numbers : [];
  const emails = data.contact ? data.contact.emails : [];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.some((item) => item.uuid === tag.uuid)
        ? prev.filter((item) => item.uuid !== tag.uuid)
        : [...prev, tag]
    );
  };

  return (
    <div className="container py-12">
      <div className="space-y-4 text-center text-white">
        <p className="font-display text-3xl">Vítejte na Vašem admin panelu</p>
        <p className="text-sm text-white/70">Své údaje lze aktualizovat níže</p>
      </div>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Lidé vidí váš profil takto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="flex flex-1 flex-col gap-4">
                <h1 className="font-display text-3xl text-foreground">
                  {title_b} {name} {mid_name} {surname} {title_a}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag.uuid} variant="secondary">
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
                        <Phone className="h-4 w-4" /> {element}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    {emails.map((element) => (
                      <span key={element} className="flex items-center gap-2">
                        <Mail className="h-4 w-4" /> {element}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="italic text-muted-foreground" dangerouslySetInnerHTML={{ __html: claim }} />
              </div>
              <div className="aspect-square w-full max-w-[220px] overflow-hidden rounded-lg bg-muted">
                <img src={pic_url} alt={`Picture of ${name}`} className="h-full w-full object-cover" />
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl text-foreground">Něco o mně</h2>
              <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: bio }} />
            </div>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="edit">
            <AccordionTrigger className="text-lg font-semibold">
              Upravte si své údaje podle potřeby
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="grid gap-4 pt-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="Name">Jméno</Label>
                    <Input id="Name" defaultValue={name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Mid_name">Prostřední jméno</Label>
                    <Input id="Mid_name" defaultValue={mid_name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Surname">Příjmení</Label>
                    <Input id="Surname" defaultValue={surname} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Title_b">Titul před jménem</Label>
                    <Input id="Title_b" defaultValue={title_b} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Title_a">Titul za jménem</Label>
                    <Input id="Title_a" defaultValue={title_a} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Pic_url">Adresa obrázku</Label>
                    <Input id="Pic_url" defaultValue={pic_url} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Price">Cena za 60 minut</Label>
                    <Input id="Price" type="number" min={0} defaultValue={cena} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="Location">Lokace</Label>
                    <Input id="Location" defaultValue={location} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="Claim">Claim</Label>
                    <Input id="Claim" defaultValue={claim} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="Bio">Bio</Label>
                    <Textarea id="Bio" defaultValue={bio} rows={4} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Tagy</Label>
                    <ScrollArea className="h-40 rounded-md border p-3">
                      <div className="grid gap-2 md:grid-cols-2">
                        {allTags.map((tag) => (
                          <label key={tag.uuid} className="flex items-center gap-2 text-sm">
                            <Checkbox
                              checked={selectedTags.some((item) => item.uuid === tag.uuid)}
                              onCheckedChange={() => toggleTag(tag)}
                            />
                            {tag.name}
                          </label>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Kontakty</Label>
                    <div className="grid gap-2 md:grid-cols-2">
                      {emails.map((element, index) => (
                        <Input key={element} defaultValue={element} type="email" />
                      ))}
                      {telephone_numbers.map((element, index) => (
                        <Input key={element} defaultValue={element} type="tel" />
                      ))}
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button type="submit" className="w-full">
                    Potvrdit
                  </Button>
                </div>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="space-y-4 text-center text-white">
          <p className="font-display text-3xl">Vaši studenti již čekají na schválení!</p>
          <p className="text-sm text-white/70">Zvolte požadované datum v kalendáři níže.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-4">
            {userReservations.length === 0
              ? null
              : filteredDATA.map((reservation) => (
                  <FadeInView key={reservation.uuid}>
                    <ReservedUser userData={reservation} />
                  </FadeInView>
                ))}
          </div>
          {userReservations.length === 0 ? null : (
            <Card>
              <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
                  disabled={{ after: dayjs().add(12, "month").toDate() }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
