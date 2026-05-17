import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";

export default function ReserveBox({ tags, cena }) {
  const tomorrow = dayjs().add(1, "day").toDate();
  const maxHour = 20;

  const [date, setDate] = useState(tomorrow);
  const [time, setTime] = useState(13);
  const [duration, setDuration] = useState(1);
  const [checked, setChecked] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);

  const maxDuration = useMemo(() => Math.max(1, maxHour - time), [time]);
  const timeOptions = useMemo(() => Array.from({ length: 12 }, (_, index) => 8 + index), []);

  useEffect(() => {
    if (duration > maxDuration) {
      setDuration(maxDuration);
    }
  }, [duration, maxDuration]);

  const tagOptions = tags || [];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.some((item) => item.uuid === tag.uuid)
        ? prev.filter((item) => item.uuid !== tag.uuid)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    try {
      const firstName = document.getElementById("Jmeno").value;
      const lastName = document.getElementById("Prijmeni").value;
      const email = document.getElementById("E-Mail").value;
      const telephone = document.getElementById("Telefon").value;
      const souhlas = checked ? 1 : 0;
      const selectedTagNames = selectedTags.map((tag) => tag.name);
      const date_of_reserv = dayjs(date).format("YYYY-M-D");
      const from_time = time;
      const to_time = time + duration;
      const teacher_id = window.location.pathname.split("/")[2];

      const payload = {
        teacher_id,
        firstName,
        middleName: "",
        lastName,
        date_of_reserv,
        from_time,
        to_time,
        location: "",
        email,
        prefix: 0,
        telephone,
        souhlas,
        tags: selectedTagNames,
      };

      const response = await axios.post(
        `http://7d17dc13931b9d11.app.tourdeapp.cz/api/reservation/${teacher_id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Řekněte nám pár údajů o sobě a zarezervujte si schůzku</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="Jmeno">Jméno</Label>
              <Input required autoComplete="given-name" id="Jmeno" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Prijmeni">Příjmení</Label>
              <Input required autoComplete="family-name" id="Prijmeni" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="E-Mail">E-Mail</Label>
              <Input required type="email" id="E-Mail" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Telefon">Telefonní číslo</Label>
              <Input required type="tel" id="Telefon" />
            </div>
            <div className="flex items-center justify-between rounded-md border px-4 py-3">
              <Label htmlFor="souhlas">Souhlas s podmínkami</Label>
              <Switch id="souhlas" checked={checked} onCheckedChange={setChecked} />
            </div>
            <div className="space-y-2">
              <Label>Vyberte tagy, o které máte zájem</Label>
              <ScrollArea className="h-40 rounded-md border p-3">
                <div className="grid gap-2">
                  {tagOptions.map((tag) => (
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
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Datum Vaší schůzky</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => selectedDate && setDate(selectedDate)}
                disabled={{ before: tomorrow, after: dayjs().add(12, "month").toDate() }}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-2">
              <Label>Vyberte si čas začátku</Label>
              <Select value={String(time)} onValueChange={(value) => setTime(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Vyberte čas" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((hour) => (
                    <SelectItem key={hour} value={String(hour)}>
                      {hour}:00
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Naši lektoři tu jsou pro Vás od 8:00 do 20:00</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="Doba">Počet hodin</Label>
              <Input
                type="number"
                id="Doba"
                value={duration}
                min={1}
                max={maxDuration}
                onChange={(event) => setDuration(Number(event.target.value))}
              />
              <p className="text-sm text-muted-foreground">Cena: {cena * duration} Kč</p>
              <p className="text-sm text-muted-foreground">
                {dayjs(date).format("D. M. YYYY")} · {time}:00 - {time + duration}:00
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            Závazně rezervovat
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Po rezervaci vyčkejte na reakci lektora. Lektor se může rozhodnout schůzku potvrdit či zrušit.
            V obou případech Vám zašleme e-mail.
          </p>
        </CardFooter>
      </Card>
    </form>
  );
}
